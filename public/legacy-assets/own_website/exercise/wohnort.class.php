<?php
	class Wohnort {
		private $strasse = "";
		private $hausnr = "";
		private $plz = "";
		private $ort = "";
		// CONSTRUCT
		public function __construct($str,$hnr,$plz,$ort) {
			$this->strasse = $str;
			$this->hausnr = $hnr;
			$this->plz = $plz;
			$this->ort = $ort;
		}
		// GET
		public function getStrasse() {
			return $this->strasse;
		}
		public function getHausnr() {
			return $this->hausnr;
		}
		public function getPLZ() {
			return $this->plz;
		}
		public function getOrt() {
			return $this->ort;
		}
		// TOSTRING
		public function __toString() {
			return "Wohnort: ".
			$this->strasse . " " .
			$this->hausnr . ", " .
			$this->plz . " " .
			$this->ort;
			
		}
	}
?>