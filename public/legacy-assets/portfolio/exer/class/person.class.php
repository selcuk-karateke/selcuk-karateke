<?php
	class Person {
		private $vorname = "";
		private $nachname = "";
		private $geburtsdatum = "";
		private $wohnort = null;
		// CONSTRUCT
		public function __construct($vn,$nn,$gebdat) {
			$this->vorname = $vn;
			$this->nachname = $nn;
			$this->geburtsdatum = $gebdat;
			
		}
		// GET
		public function getVorname() {
			return $this->vorname;
		}
		public function getNachame() {
			return $this->nachname;
		}
		public function getGeburtsdatum() {
			return $this->geburtsdatum;
		}
		public function getWohnort() {
			return $this->wohnort;
		}
		// SET
		public function setWohnort(Wohnort $wo) {
			$this->wohnort = $wo;
		}
		// TOSTRING
		public function __toString() {
			return 
			$this->vorname . " " .
			$this->nachname . ", geboren am: " .
			$this->geburtsdatum . ", " .
			$this->wohnort;
			
		}
	}
?>



