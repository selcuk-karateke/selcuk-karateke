<?php
  $netto = !empty($_POST["netto"]) ? htmlspecialchars($_POST["netto"])*1 : "";
  $prozent = !empty($_POST["prozent"]) ? htmlspecialchars($_POST["prozent"])*1 : "";
?>
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
  <title>NettoBruttoRechner</title>
 </head>
 <body>
	<a href="index.php">zurück</a>
  <h1>NettoBruttoRechner</h1>
  <table>
   <tr>
	<td>Nettowert</td>
	<td><?php echo $netto ?></td>
   </tr>
   <tr>
	<td>Steuersatz</td>
	<td><?php echo $prozent ?>%</td>
   </tr>
   <tr>
	<td>Bruttowert</td>
	<td><?php echo $netto * (1+$prozent/100) ?></td>
   </tr>
  </table>
  <p>
  <form action="nettoBrutto.php" method="post">
  <p><input type="text" name="netto" placeholder="Nettowert" /> Nettowert</p>
  <p><input type="text" name="prozent" placeholder="Steuersatz (in %)" /> Steuersatz (in %)</p>
  <p><input type="submit"/> <input type="reset"/></p>
  </form>
  </p>
 </body>
</html>


