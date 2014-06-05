<?php

if (isset($_POST['type'])) {

    switch ($_POST['type']) {

        case 'nature':
            $dir = "img/nature";
            break;

        case 'home':
            $dir = "img/home";
            break;
        case 'travel':
            $dir = "img/travel";
            break;

        default:
            break;
    }

    $dh = opendir($dir);
    while ($filename = readdir($dh)) {
        if (!is_dir($filename))
            $allFiles[] = $filename;
    }
    
    $allFiles = array_diff($allFiles, array('.', '..'));
    echo json_encode($allFiles);
}
?>