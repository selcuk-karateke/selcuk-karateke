<?php
header("Content-Type: text/css");
$z = "50px";
?>

table {
	overflow: hidden;
	border-collapse: collapse;
}
tr:hover {
	background-color: #ffa;
}
td, th {
	position: relative;
	text-align: center;
	border: 1px solid #ddd;
	width: <?= $z ?>;
	height: <?= $z ?>;
	border: 2px solid #ddd;
	font-style:oblique;
}
tr.trow:first-child {
	font-weight: bold;
	background-color: lightgrey;
}
td.tcol:first-child {
	font-weight: bold;
	background-color: lightgrey;
}
td.tcol:hover {
	color: white;
	font-weight: bold;
	font-size: 22px;
	background-color: grey;
}
td:hover::after,
th:hover::after {
	content: "";
	position: absolute;
	background-color: #ffa;
	left: 0;
	top: -5000px;
	height: 10000px;
	width: 100%;
	z-index: -1;
}			

.slider {
	-webkit-appearance: none;
	border: 1px solid grey;
	background: #d3d3d3;
	margin: 0px;
	padding: 0px 20px 0px 20px;
	display: inline;* {
}