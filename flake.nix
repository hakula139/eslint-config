{
  description = "Shared ESLint flat configs for JavaScript and TypeScript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    devkit = {
      url = "github:hakula139/devkit/v3";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      devkit,
      nixpkgs,
      ...
    }:
    devkit.lib.eachSystem devkit.lib.systems (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        dk = devkit.lib.mkLib pkgs;

        preCommit = dk.preCommit {
          src = ./.;
          hooks = {
            eslint.enable = true;
            prettier.enable = true;
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "eslint-config-dev";
          packages = builtins.attrValues dk.nodeToolchain;
          inputsFrom = [
            preCommit
          ];
        };
      }
    );
}
