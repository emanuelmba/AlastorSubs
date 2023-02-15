<?php
  if (isset($_POST['email']) && isset($_POST['nombre'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $motivo = $_POST['motivo'];

    $header = 'From: ' . $email . " \r\n";
    $header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
    $header .= "Mime-Version: 1.0 \r\n";
    $header .= "Content-Type: text/plain";

    $mensaje .= "Nombre: " . $nombre . " \r\n";
    $mensaje .= "E-mail: " . $email . " \r\n";
    $mensaje .= "Motivo: " . $motivo . " \r\n";
    $mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";

    $para = 'info@editorial-alastor.com.ar';
    $asunto = 'AlastorSubs Form';

    error_reporting(0);
    if ($nombre != '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
      mail($para, $asunto, utf8_decode($mensaje), $header);

      if (headers_sent()) {
          // las cabeceras ya se han enviado, no intentar añadir una nueva
      }
      else {
          header('Location: http://editorial-alastor.com.ar/subs/mssg.html');
      }
    }
    else {
      header('Location: http://editorial-alastor.com.ar/subs/mssg-err.html');
    }
  }
?>