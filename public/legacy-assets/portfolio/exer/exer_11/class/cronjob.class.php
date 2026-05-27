<?php
 
Class Cronjob {
 
    private $connection;
    private $path;
    private $handle;
    private $cron_file;
	
    function __construct($host = 'localhost', $port = '22', $username = 'root', $password = 'root') {
        // full path and name of the current file
        $path_length = strrpos(__FILE__, "/");      
        $this->path  = substr(__FILE__, 0, $path_length) . '/';
        $this->handle    = 'crontab.txt';        
        $this->cron_file = "{$this->path}{$this->handle}";
		// echo "<pre>".$this->cron_file."</pre>"; // /var/www/html/bagobag/classes/crontab.txt
        // echo $host ."," .$port. "," .$username. "," .$password;
        // making a connection to the server and authenticating it
        try {
            if (is_null($host) || is_null($port) || is_null($username) || is_null($password)) 
                throw new Exception("Please specify the host, port, username and password!");
            
            // establish a remote connection, error control operator @
            $this->connection = @ssh2_connect($host, $port);
            
            if ( ! $this->connection) 
                throw new Exception("The SSH2 connection could not be established.");
            
            // if the authentication fails
            $authentication = @ssh2_auth_password($this->connection, $username, $password);
            if ( ! $authentication) 
                throw new Exception("Could not authenticate '{$username}' using password: '{$password}'."); 
            
        } catch (Exception $e) {
            $this->error_message($e->getMessage());
        }
    }
 
    public function exec() {
        // total number of arguments
        $argument_count = func_num_args();
        try {
            if ( ! $argument_count) throw new Exception("There is nothing to execute, no arguments specified.");
            // create an array of all the arguments
            $arguments = func_get_args();
            // separate each element with the Linux operator &&
            $command_string = ($argument_count > 1) ? implode(" && ", $arguments) : $arguments[0];
            
			// echo "<pre>".$command_string."</pre>"; // crontab -l > /var/www/html/bagobag/classes/crontab.txt && [ -f /var/www/html/bagobag/classes/crontab.txt ] || > /var/www/html/bagobag/classes/crontab.txt
			// try to executing multiple commands
            $stream = @ssh2_exec($this->connection, $command_string);
            
			if ( ! $stream) throw new Exception("Unable to execute the specified commands: <br />{$command_string}");
        }
        catch (Exception $e) {
            $this->error_message($e->getMessage());
        }
    }
	// write active cronjobs to file
    public function write_to_file($path=NULL, $handle=NULL) {
        if ( ! $this->crontab_file_exists()) {       
        $this->handle = (is_null($handle)) ? $this->handle : $handle;
        $this->path   = (is_null($path))   ? $this->path   : $path;
        // concatenate properties together
        $this->cron_file = "{$this->path}{$this->handle}";
        // -l argument set, to display the users crontab as standard output
        $init_cron = "crontab -l > {$this->cron_file} && [ -f {$this->cron_file} ] || > {$this->cron_file}";
		// pass the command string to it as the only argument
        $this->exec($init_cron);
        }
        return $this;

    }
	
	public function check_cronjob($cron_job=NULL){
		
		$this->write_to_file();
		$cron_array = file($this->cron_file, FILE_IGNORE_NEW_LINES);

		if (empty($cron_array)){ $this->remove_file(); return false; }
		
		foreach ($cron_array as $cron) {
			if ($cron == $cron_job){
				$this->remove_file();
				return true;
			}
		}
		$this->remove_file();
		
	}
 
    public function remove_file() {
        if ($this->crontab_file_exists()) {
			$this->exec("rm {$this->cron_file}");
			// for move_file
			// $this->exec("mv {$this->cron_file} /var/www/html/bagobag/crontab.txt");
        }
        return $this;
    }    
	// create new cron jobs to the temporary cron file and then executing the command
    public function append_cronjob($cron_jobs=NULL) {
        if (is_null($cron_jobs)) $this->error_message("Nothing to append!  Please specify a cron job or an array of cron jobs.");
         
        $append_cronfile = "echo '";        
         
        $append_cronfile .= (is_array($cron_jobs)) ? implode("\n", $cron_jobs) : $cron_jobs;
         
        $append_cronfile .= "'  >> {$this->cron_file}";
         
        $install_cron = "crontab {$this->cron_file}";
		
        $this->write_to_file()->exec($append_cronfile, $install_cron);
		
		// show crontab
		$myfile = fopen("/var/www/html/bagobag/classes/crontab.txt", "r") or die("Unable to open file!");
		echo "<pre>";
		var_dump(fread($myfile,filesize("/var/www/html/bagobag/classes/crontab.txt")));
		echo "</pre>";
		fclose($myfile);
		
		$this->remove_file();
		
		return $this;
    }
	public function remove_cronjob($cron_jobs=NULL) {
		// check if the argument is NULL
		if (is_null($cron_jobs)) $this->error_message("Nothing to remove!  Please specify a cron job or an array of cron jobs.");
		
		// write the cron tab to a file
		$this->write_to_file();
		
		// read it into an array with only the cron jobs themselves
		$cron_array = file($this->cron_file, FILE_IGNORE_NEW_LINES);
		
		// if array empty
		if (empty($cron_array)) $this->error_message("Nothing to remove!  The cronTab is already empty.");
		
		// count the elements
		$original_count = count($cron_array);
		
		echo "<pre>";
		var_dump($cron_array);
		echo "</pre>";
		
		if (is_array($cron_jobs)) {
			foreach ($cron_jobs as $cron_regex) $cron_array = preg_grep($cron_regex, $cron_array, PREG_GREP_INVERT);
		} else {
			$cron_array = preg_grep($cron_jobs, $cron_array, PREG_GREP_INVERT);
		}
		
		echo "<pre>";
		var_dump($cron_array);
		echo "</pre>";
		
		// all the cron jobs to keep
		return ($original_count === count($cron_array)) ? $this->remove_file() : $this->remove_crontab()->append_cronjob($cron_array);
	}
	
 
    public function remove_crontab() {
        $this->exec("crontab -r");
        $this->remove_file();
        return $this;
    }
 
    private function crontab_file_exists() {return file_exists($this->cron_file);}
 
    private function error_message($error) {die("<pre style='color:#EE2711'>ERROR: {$error}</pre>");}
 
}