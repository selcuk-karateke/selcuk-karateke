<?php
function css_combine($destination_dir, $dest_file_name){
	$filemtime = @filemtime($destination_dir . $dest_file_name);
	$cache_life = "3600";// caching time, in seconds (1h = 3600s)
	if(!is_dir($destination_dir)){
		mkdir($destination_dir, 0777, true);
	}
    if(!is_file($destination_dir . $dest_file_name) || (time() - $filemtime >= $cache_life)){ // continue only if file doesn't exist or time >= cachetime
        $content = "";
		$files = array(
			"include/css/bootstrap.min.css",
			"include/css/jquery-ui.min.css",
			"include/css/bootstrap-multiselect.css",
			"include/css/bootstrap-toggle.min.css",
			"include/css/ekko-lightbox.min.css",
			"include/css/alertify.min.css",
			"include/css/themes/bootstrap.min.css",
			"include/css/style.css"
			);
        foreach($files as $file){ // loop through array list
            $content .= file_get_contents($file);// read each file
        }
        // Remove Comments
        $content = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $content);
		// Remove space after colons
		$content = str_replace(': ', ':', $content);
		// Remove whitespace
		$content = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), ' ', $content);
		$content = preg_replace('|\s\s+|', ' ', $content);
		$content = str_replace(array(', ',',  '), ',', $content);
		$content = str_replace(array('; ',';  '), ';', $content);
        $new_file = fopen($destination_dir . $dest_file_name, "w");// open file for writing
        fwrite($new_file , $content);// write to destination
        fclose($new_file);
        return '<link rel="stylesheet" href="'. $destination_dir . $dest_file_name.'"/>' . PHP_EOL;// output combined file
    }else{
        // Use stored file
        return '<link rel="stylesheet" href="'. $destination_dir . $dest_file_name.'"/>' . PHP_EOL;// output combine file
    }
}
function js_combine($destination_dir, $dest_file_name){
	$filemtime = @filemtime($destination_dir . $dest_file_name);
	$cache_life = "3600";// caching time, in seconds (1h = 3600s)
	if(!is_dir($destination_dir)){
		mkdir($destination_dir, 0777, true);
	}
    if(!is_file($destination_dir . $dest_file_name) || (time() - $filemtime >= $cache_life)){ //continue only if file doesn't exist or time >= cachetime
        $content = "";
		$files = array(
			"include/js/jquery-3.2.1.min.js",
			"include/js/bootstrap.min.js",
			"include/js/jquery-ui.min.js",
			"include/js/bootstrap-multiselect.js",
			"include/js/ekko-lightbox.min.js",
			"include/js/alertify.min.js",
			"include/js/bootstrap-toggle.min.js",
			"include/js/custom_min.js"
			);
        foreach($files as $file){ // loop through array list
            $content .= file_get_contents($file);// read each file
        }
        // Remove Comments
		$content = preg_replace('/(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\'|\")\/\/.*))/', '', $content);
		// Remove space after colons
		$content = str_replace(array(': ',' :'), ':', $content);
		// Remove whitespace
		$content = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), ' ', $content);
		$content = preg_replace('|\s\s+|', ' ', $content);
		$content = str_replace(array(', ',',  '), ',', $content);
		$content = str_replace(array('; ',';  '), ';', $content);
        $new_file = fopen($destination_dir . $dest_file_name, "w");// open file for writing
        fwrite($new_file , $content);// write to destination
        fclose($new_file);
        return '<script type="text/javascript" src="'. $destination_dir . $dest_file_name.'"></script>' . PHP_EOL;// output combined file
    }else{ 
        // Use stored file
        return '<script type="text/javascript" src="'. $destination_dir . $dest_file_name.'"></script>' . PHP_EOL;// output combine file
    }
}
function getlang($val){
	if(file_exists('lang/'.$val.'.php')){
		include_once('lang/'.$val.'.php');
		return $out;
	}else{
		DEBUG ? $log->lwrite('[DEBUG] Language does not exists: '.$val) : "";
		include_once('lang/de.php');
		return $out;
	}
}
function dirToArray($dir){
	$result = array();
	$cdir = scandir($dir);
	foreach($cdir as $key => $value){
		if(!in_array($value,array(".",".."))){
			if(is_dir($dir . DIRECTORY_SEPARATOR . $value)){
				$result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
			}else{
				$result[] = preg_replace('/\\.[^.\\s]{3,4}$/', '', $value);
			}
		}
	}
	return $result;
}
function getBagDetails($db){
	return array(
	$b1 = Bag_FormatDepth::getFormatDepth($db),
	$b2 = Bag_FormatFoldBottom::getFormatFoldBottom($db),
	$b3 = Bag_FormatFoldSide::getFormatFoldSide($db),
	$b4 = Bag_FormatHeight::getFormatHeight($db),
	$b5 = Bag_FormatWidth::getFormatWidth($db),
	$b6 = Bag_FormatBottomSquare::getFormatBottomSquare($db),
	$b7 = Bag_Handle::getHandle($db),
	$b8 = Bag_HandleCordColor::getHandlecordcolor($db),
	$b9 = Bag_HandleEyelet::getHandleeyelet($db),
	$b10 = Bag_HandleFix::getHandlefix($db),
	$b11 = Bag_HandleLength::getHandlelength($db),
	$b11x = Bag_HandleLength::getHandlelength2($db),
	$b12 = Bag_HandleLoopColor::getHandleloopcolor($db),
	$b13 = Bag_HandleNumber::getHandlenumber($db),
	$b14 = Bag_HandleWideThickness::getHandlewidethickness($db),
	$b15 = Bag_Material::getMaterial($db),
	$b16 = Bag_MaterialFoilColor::getMaterialfoilcolor($db),
	$b17 = Bag_MaterialFoilThickness::getMaterialfoilthickness($db),
	$b18 = Bag_MaterialGrammage::getMaterialgrammage($db),
	$b19 = Bag_MaterialMicron::getMaterialMicron($db),
	$b20 = Bag_MaterialPaperColor::getMaterialpapercolor($db),
	$b21 = Bag_Pantone::getPantoneColor($db),
	//$b22 = 
	//$b23 = 
	$b24 = Bag_Coat::getCoat($db),
	$b25 = Bag_CMYK::getCMYK($db),
	$b26 = Bag_PrintCountBack::getPrintCountBack($db),
	$b27 = Bag_PrintCountFront::getPrintCountFront($db),
	$b28 = Bag_PrintCoverage::getPrintCoverage($db),
	$b29 = Bag_PrintSubject::getPrintMotive($db),
	$b30 = Bag_PrintSubjectSameBackFront::getSameMotives($db),
	$b31 = Bag_PrintTechnology::getPrintTechnology($db),
	$b32 = Bag_PrintText::getPrintText($db),
	$b33 = Bag_Release::getRelease($db),
	$b34 = Bag_ReleasePressButtonNumber::getReleasepressbuttonnumber($db),
	$b35 = Bag_FinishingLaminate::getFinishinglaminate($db),
	$b36 = Bag_FinishingStamping::getFinishingstamping($db),
	$b37 = Bag_InforcementExtraCardBoardBottom::getInforcementExtraCardBoardBottom($db),
	$b38 = Bag_InforcementWireFrame::getInforcementWireFrame($db),
	$b39 = Bag_Processing::getProcessing($db),
	$b40 = Bag_ProcessingAirHoles::getProcessingairholes($db),
	$b41 = Bag_ProcessingReinforcement::getProcessingreinforcement($db),
	$b42 = Bag_ProcessingSeams::getProcessingseams($db),
	$b43 = Bag_ProcessingSeamsInsideOutside::getProcessingSeamsInsideOutside($db),
	$b44 = Bag_ProcessingSewnWelded::getProcessingSewnWelded($db),
	$b45 = Bag_ProcessingTopFold::getProcessingTopFold($db),
	$b46 = Bag_Supplier::getSupplier($db),
	//$b47 = Bag::getTemplate($db),
	$b48 = Bag_Specialform::getSpecialform($db)
	);
}
function getBagSortiert($db, $id, $s, $c, $limit, $start = 0){
	return array(
	$b0 = bag::getTaschenSortiert($db, $id, $s, $c, $limit, $start),
	$b1 = Bag_FormatDepth::getFormatDepth($db),
	$b4 = Bag_FormatHeight::getFormatHeight($db),
	$b5 = Bag_FormatWidth::getFormatWidth($db),
	$b15 = Bag_Material::getMaterial($db),
	$b17 = Bag_MaterialFoilThickness::getMaterialfoilthickness($db),
	$b18 = Bag_MaterialGrammage::getMaterialgrammage($db),
	$b46 = Bag_Supplier::getSupplier($db)
	);
}
function getBag($db, $id){
	return array(
	$b0 = bag::holeBag($db, $id),
	$b1 = Bag_FormatDepth::getFormatDepth($db),
	$b2 = Bag_FormatFoldBottom::getFormatFoldBottom($db),
	$b3 = Bag_FormatFoldSide::getFormatFoldSide($db),
	$b4 = Bag_FormatHeight::getFormatHeight($db),
	$b5 = Bag_FormatWidth::getFormatWidth($db),
	$b6 = Bag_FormatBottomSquare::getFormatBottomSquare($db),
	$b7 = Bag_Handle::getHandle($db),
	$b8 = Bag_HandleCordColor::getHandlecordcolor($db),
	$b9 = Bag_HandleEyelet::getHandleeyelet($db),
	$b10 = Bag_HandleFix::getHandlefix($db),
	$b11 = Bag_HandleLength::getHandlelength($db),
	$b11x = Bag_HandleLength::getHandlelength2($db),
	$b12 = Bag_HandleLoopColor::getHandleloopcolor($db),
	$b13 = Bag_HandleNumber::getHandlenumber($db),
	$b14 = Bag_HandleWideThickness::getHandlewidethickness($db),
	$b15 = Bag_Material::getMaterial($db),
	$b16 = Bag_MaterialFoilColor::getMaterialfoilcolor($db),
	$b17 = Bag_MaterialFoilThickness::getMaterialfoilthickness($db),
	$b18 = Bag_MaterialGrammage::getMaterialgrammage($db),
	$b19 = Bag_MaterialMicron::getMaterialMicron($db),
	$b20 = Bag_MaterialPaperColor::getMaterialpapercolor($db),
	$b21 = Bag_Pantone::getPantoneColor($db),
	//$b22 = 
	//$b23 = 
	$b24 = Bag_Coat::getCoat($db),
	$b25 = Bag_CMYK::getCMYK($db),
	$b26 = Bag_PrintCountBack::getPrintCountBack($db),
	$b27 = Bag_PrintCountFront::getPrintCountFront($db),
	$b28 = Bag_PrintCoverage::getPrintCoverage($db),
	$b29 = Bag_PrintSubject::getPrintMotive($db),
	$b30 = Bag_PrintSubjectSameBackFront::getSameMotives($db),
	$b31 = Bag_PrintTechnology::getPrintTechnology($db),
	$b32 = Bag_PrintText::getPrintText($db),
	$b33 = Bag_Release::getRelease($db),
	$b34 = Bag_ReleasePressButtonNumber::getReleasepressbuttonnumber($db),
	$b35 = Bag_FinishingLaminate::getFinishinglaminate($db),
	$b36 = Bag_FinishingStamping::getFinishingstamping($db),
	$b37 = Bag_InforcementExtraCardBoardBottom::getInforcementExtraCardBoardBottom($db),
	$b38 = Bag_InforcementWireFrame::getInforcementWireFrame($db),
	$b39 = Bag_Processing::getProcessing($db),
	$b40 = Bag_ProcessingAirHoles::getProcessingairholes($db),
	$b41 = Bag_ProcessingReinforcement::getProcessingreinforcement($db),
	$b42 = Bag_ProcessingSeams::getProcessingseams($db),
	$b43 = Bag_ProcessingSeamsInsideOutside::getProcessingSeamsInsideOutside($db),
	$b44 = Bag_ProcessingSewnWelded::getProcessingSewnWelded($db),
	$b45 = Bag_ProcessingTopFold::getProcessingTopFold($db),
	$b46 = Bag_Supplier::getSupplier($db),
	//$b47 = Bag::getTemplate($db),
	$b48 = Bag_Specialform::getSpecialform($db)
	);
}
function showNotifications($db,$userID){
	$sql = "SELECT user_id FROM notifications WHERE user_id='".$userID."'";
	$result = $db->query($sql);
	$num_rows = (int)$result->rowCount();
	if($num_rows == null) return "0";
	return $num_rows;
}
function showMessages($db,$userID){
	$sql = "SELECT user_id_to FROM messages WHERE user_id_to='".$userID."'";
	$result = $db->query($sql);
	$num_rows = (int)$result->rowCount();
	if($num_rows == null) return "0";
	return $num_rows;
}
function dateConvertUS($string){
	$myDate = date_create($string);
	$newDate = date_format($myDate,"Y-m-d H:i:s");
	return $newDate;
}
function dateConvert($string){
	$myDate = date_create($string);
	$newDate = date_format($myDate,"d.m.Y (H:i:s)");
	return $newDate;
}
function shortDate($string){
	$myDate = date_create($string);
	$newDate = date_format($myDate,"d.m.Y");
	return $newDate;
}
function shortDateUS($string){
	$myDate = date_create($string);
	$newDate = date_format($myDate,"Y-m-d");
	return $newDate;
}
function resize_image($path,$id,$x,$type, $file, $w, $h, $crop=FALSE){
	if($type != "pdf"){
		list($width, $height) = getimagesize($file);
		$r = $width / $height;
		if($crop){
			if($width > $height){
				$width = ceil($width-($width*abs($r-$w/$h)));
			}else{
				$height = ceil($height-($height*abs($r-$w/$h)));
			}
			$newwidth = $w;
			$newheight = $h;
		}else{
			if($w/$h > $r){
				$newwidth = $h*$r;
				$newheight = $h;
			}else{
				$newheight = $w/$r;
				$newwidth = $w;
			}
		}
	}
	if($type == "jpg"){
		$src = imagecreatefromjpeg($file);
		$dst = imagecreatetruecolor($newwidth, $newheight);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
		imagejpeg($dst, $path.$id.'_upl_img'.$x.'_thumb.jpg',98);
	}else if($type == "png"){
		$src = imagecreatefrompng($file);
		$dst = imagecreatetruecolor($newwidth, $newheight);
		imagealphablending($dst, false);
		imagesavealpha($dst, true);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
		imagepng($dst, $path.$id.'_upl_img'.$x.'_thumb.png');
	}else if($type == "pdf"){
		
	}else if($type == "thumb"){
		$src = imagecreatefromjpeg($file);
		$dst = imagecreatetruecolor($newwidth, $newheight);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
		imagejpeg($dst, $path.$id.'_thumb_a.jpg',98);
	}else if($type == "thumbnail"){
		$src = imagecreatefromjpeg($file);
		$dst = imagecreatetruecolor($newwidth, $newheight);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
		imagejpeg($dst, $path.$id.'_thumbnail.jpg',98);
	}
	imagedestroy($src);
	//imagedestroy($dst);
}
function dateDifference($date_1, $date_2, $differenceFormat = '%a'){
    $datetime1 = date_create($date_1);
    $datetime2 = date_create($date_2);
    $interval = date_diff($datetime1, $datetime2);
    return $interval->format($differenceFormat);
}
function regenerateSession($reload = false){
    // This token is used by forms to prevent cross site forgery attempts
    if(!isset($_SESSION['nonce']) || $reload){
        //$_SESSION['nonce'] = md5(microtime(true));
        $_SESSION['nonce'] = bin2hex(openssl_random_pseudo_bytes(32));
	}
    if(!isset($_SESSION['IPaddress']) || $reload){
        $_SESSION['IPaddress'] = $_SERVER['REMOTE_ADDR'];
	}
    if(!isset($_SESSION['userAgent']) || $reload){
        $_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
	}
    // Set current session to expire in 60 minutes
    $_SESSION['OBSOLETE'] = true;
    $_SESSION['EXPIRES'] = time() + 3600;
    // Create new session without destroying the old one
    session_regenerate_id(false);
    // Grab current session ID and close both sessions to allow other scripts to use them
    $newSession = session_id();
    session_write_close();
    // Set session ID to the new one, and start it back up again
    session_id($newSession);
    session_start();
    // Don't want this one to expire
    unset($_SESSION['OBSOLETE']);
    unset($_SESSION['EXPIRES']);
}
function checkSession($log){
    try{
        if(isset($_SESSION['OBSOLETE']) && ($_SESSION['EXPIRES'] < time())){
			DEBUG ? $log->lwrite("Warning: Attempt to use expired session.") : "";
			LOG_ERROR ? $log->lwrite("Warning: Attempt to use expired session.") : "";
            throw new Exception('Attempt to use expired session.');
		}
		if(!isset($_GET["page"]) || $_GET["page"] == "login" || $_GET["page"] == "register"){
			if(isset($_SESSION['user_id']) && !is_numeric($_SESSION['user_id'])){
				DEBUG ? $log->lwrite("Warning: No session started.") : "";
				LOG_ERROR ? $log->lwrite("Warning: No session started.") : "";
				throw new Exception('No session started.');
			}
		}
        if($_SESSION['IPaddress'] != $_SERVER['REMOTE_ADDR']){
			DEBUG ? $log->lwrite("Warning: IP Address mismatch (possible session hijacking attempt).") : "";
			LOG_ERROR ? $log->lwrite("Warning: IP Address mismatch (possible session hijacking attempt).") : "";
            throw new Exception('IP Address mismatch (possible session hijacking attempt).');
		}
        if($_SESSION['userAgent'] != $_SERVER['HTTP_USER_AGENT']){
			DEBUG ? $log->lwrite("Warning: Useragent mismatch (possible session hijacking attempt).") : "";
			LOG_ERROR ? $log->lwrite("Warning: Useragent mismatch (possible session hijacking attempt).") : "";
            throw new Exception('Useragent mismatch (possible session hijacking attempt).');
		}
        // if(!$this->loadUser($_SESSION['user_id'])){
            // throw new Exception('Attempted to log in user that does not exist with ID: ' . $_SESSION['user_id']);
		// }
        if(!isset($_SESSION['OBSOLETE']) && mt_rand(1, 100) == 1){
			DEBUG ? $log->lwrite("Running: regenerateSession()") : "";
			LOG_ERROR ? $log->lwrite("Running: regenerateSession()") : "";
            regenerateSession();
        }
        return true;
    }catch(Exception $e){
        return false;
    }
}
function paging($targetpage,$go,$total,$limit){
	/* Setup page vars for display. */
	$adjacents = 3;
	if($go == 0) $go = 1;// if no page var is given, default to 1.
	$prev = $go - 1;// previous page is current page - 1
	$next = $go + 1;// next page is current page + 1
	$lastpage = ceil($total/$limit);// lastpage.
	$lpm1 = $lastpage - 1;// last page minus 1
	$pagination = "";
	$counter = 0;
	if($lastpage > 1){ 
		$pagination .= "<ul class='pagination' style='margin-bottom:0px;margin:0px;'>";
		if ($go > $counter+1){
			$pagination .= "<li><a href=\"$targetpage&go=$prev\"><</a></li>";
		}
		if ($lastpage < 7 + ($adjacents * 2)){ 
			for ($counter = 1;$counter <= $lastpage;$counter++){
				if($counter == $go)
					$pagination .= "<li><a href='#' class='active'>$counter</a></li>";
				else
					$pagination .= "<li><a href=\"$targetpage&go=$counter\">$counter</a></li>";
			}
		}elseif($lastpage > 5 + ($adjacents * 2))// enough pages to hide some
		{
			// close to beginning, only hide later pages
			if($go < 1 + ($adjacents * 2)){
				for ($counter = 1;$counter < 4 + ($adjacents * 2);$counter++){
					if($counter == $go)
						$pagination .= "<li><a href='#' class='active'>$counter</a></li>";
					else
						$pagination .= "<li><a href=\"$targetpage&go=$counter\">$counter</a></li>";
				}
				//$pagination .= "<li>...</li>";
				$pagination .= "<li><a href=\"$targetpage&go=$lpm1\">$lpm1</a></li>";
				$pagination .= "<li><a href=\"$targetpage&go=$lastpage\">$lastpage</a></li>";
			}
			// in middle, hide some front and some back
			elseif($lastpage - ($adjacents * 2) > $go && $go > ($adjacents * 2)){
				$pagination .= "<li><a href=\"$targetpage&go=1\">1</a></li>";
				$pagination .= "<li><a href=\"$targetpage&go=2\">2</a></li>";
				//$pagination .= "<li>...</li>";
				for($counter = $go - $adjacents;$counter <= $go + $adjacents;$counter++){
					if($counter == $go)
						$pagination .= "<li><a href='#' class='active'>$counter</a></li>";
					else
						$pagination .= "<li><a href=\"$targetpage&go=$counter\">$counter</a></li>";
				}
				//$pagination .= "<li>...</li>";
				$pagination .= "<li><a href=\"$targetpage&go=$lpm1\">$lpm1</a></li>";
				$pagination .= "<li><a href=\"$targetpage&go=$lastpage\">$lastpage</a></li>";
			}
			// close to end, only hide early pages
			else{
				$pagination .= "<li><a href=\"$targetpage&go=1\">1</a></li>";
				$pagination .= "<li><a href=\"$targetpage&go=2\">2</a></li>";
				//$pagination .= "<li>...</li>";
				for($counter = $lastpage - (2 + ($adjacents * 2));$counter <= $lastpage;
				$counter++){
					if($counter == $go){
						$pagination .= "<li><a href='#' class='active'>$counter</a></li>";
					}else{
						$pagination .= "<li><a href=\"$targetpage&go=$counter\">$counter</a></li>";
					}
				}
			}
		}
		// next button
		if($go < $counter - 1){
			$pagination .= "<li><a href=\"$targetpage&go=$next\">></a></li>";
		}else{
			$pagination .= "";
		}
		$pagination .= "</ul>\n";
	}
	return $pagination;
}
function convertDotNumber($zahl){
	if((strpos($zahl,".") > "-1") | (strpos($zahl,",") > "-1")){
		if((strpos($zahl,".") > "-1") & (strpos($zahl,",") > "-1")){
			if(strpos($zahl,".") > strpos($zahl,",")){
				return str_replace(",","",$zahl);
			}else{
				return str_replace(",",".",str_replace(".","",$zahl));
			}
		}else{
			if(strpos($zahl,".") > "-1"){
				if(strpos($zahl,".") == strrpos($zahl,".")){
					return $zahl;
				}else{
					return str_replace(".","",$zahl);          
				} 
			}else{
				if(strpos($zahl,",") == strrpos($zahl,",")){
					return str_replace(",",".",$zahl);
				}else{
					return str_replace(",","",$zahl);
				} 
			}
		}
	}else{
		return $zahl;
	}
}
function dotcomma($val){
	return str_replace(".",",",$val);
}
function commadot($val){
	return str_replace(",",".",$val);
}
function mround($val, $f=2, $d=6){
    return sprintf("%".$d.".".$f."f", $val);
}
function convert($size){
	$unit = array('B','KB','MB','GB','TB','PB');
	return dotcomma(@round($size/pow(1024,($i = floor(log($size,1024)))),2)).' '.$unit[$i];
}
function rekursive_groesse($path){
	$handle = opendir($path);
	$summe1 = 0;
	$summe2 = "-1";
	while(false !== ($file = readdir($handle))){
		if($file !== "." && $file !== ".."){
			if(true === is_dir($path.$file)){
				$summe1 += rekursive_groesse($path."/".$file);
				$summe2++;
			}else{
				$summe1 += filesize($path."/".$file);
				$summe2++;
			}
		}
	}
	closedir($handle);
	if($summe2 == "-1"){ echo "0"; }else{ echo $summe2; }// Anzahl der Dateien
	return $summe1;// Größe der Dateien
}
function scan_dir($path){
    $ite = new RecursiveDirectoryIterator($path);
    $bytestotal = 0;
    $numfiles = 0;
    foreach(new RecursiveIteratorIterator($ite) as $filename=>$cur){
		if($cur == '.' || $cur == '..') continue;
		if(is_file($cur)){
			$filesize=$cur->getSize();
			$bytestotal+=$filesize;
			$numfiles++;
			//$files[] = $filename;
		}
    }
    //$bytestotal=number_format($bytestotal);
	$bytestotal = convert($bytestotal);
    return array('total_files'=>$numfiles,'total_size'=>$bytestotal);
}
function php_memory_limit(){
	if(ini_get('memory_limit')){
		$php_memory_limit = ini_get('memory_limit');
	}else{
		$php_memory_limit = "N/A";
	}
	return $php_memory_limit;
}
function php_max_upload_size(){
	if(ini_get('upload_max_filesize')){
		$php_max_upload_size = ini_get('upload_max_filesize');
	}else{
		$php_max_upload_size = "N/A";
	}
	return $php_max_upload_size;
}
function php_max_post_size(){
	if(ini_get('post_max_size')){
		$php_max_post_size = ini_get('post_max_size');
	}else{
		$php_max_post_size = "N/A";
	}
	return $php_max_post_size;
}
function php_max_execution_time(){
	if(ini_get('max_execution_time')){
		$max_execute = ini_get('max_execution_time');
	}else{
		$max_execute = "N/A";
	}
	return $max_execute;
}
function php_short_tag(){
	if(ini_get('short_open_tag')){
		$short_tag = "On";
	}else{
		$short_tag = "Off";
	}
	return $short_tag;
}
function php_safe_mode(){
	if(ini_get('safe_mode')){
	   $safe_mode = "On";
	}else{
	   $safe_mode = "Off";
	}
	return $safe_mode;
}
function get_server_cpu_usage(){
	if(stristr(PHP_OS, 'win')){
		$wmi = new COM("Winmgmts://");
		$server = $wmi->execquery("SELECT LoadPercentage FROM Win32_Processor");
		$cpu_num = 0;
		$load_total = 0;
		foreach($server as $cpu){
			$cpu_num++;
			$load_total += $cpu->loadpercentage;
		}
		$load = round($load_total/$cpu_num);
	}else{
		$sys_load = sys_getloadavg();
		$load = $sys_load[0];
	}
	return (int)$load;
}
?>