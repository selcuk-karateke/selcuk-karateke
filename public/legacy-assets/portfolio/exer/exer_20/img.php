<?php
header('Content-Type: image/png');

if(isset($_GET['id']))
{
    require_once ".ht_dbdata";
    Model::setDB(0);
    // Bild aus DB holen
    $image = new Image();
    $image = $image->getById($_GET['id']);
    
    $img_data = $image['imgdata'];
    $img_type = $image['imgtype'];
    
    echo $img_data;
}
else
{
    header('HTTP/1.0 404 File Not Found');
	echo "Error!";
}

?>