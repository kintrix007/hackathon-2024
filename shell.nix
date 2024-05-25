let
  url = "https://github.com/NixOS/nixpkgs/archive/07518c851b0f12351d7709274bbbd4ecc1f089c7.tar.gz";
  in
{ pkgs ? import (fetchTarball url) {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    gradle
    jdk17
  ];
}
