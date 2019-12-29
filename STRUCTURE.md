## Project Structure

* credit to Angular.io

### Workspace Configuration Files
* .editorconfig
    * Configuration for code editors. See EditorConfig.
* .gitignore
    * Specifies intentionally untracked files that Git should ignore.
* README.md
    * Introductory documentation for the root app.
* angular.json
    * CLI configuration defaults for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses, such as TSLint, Karma, and Protractor. For details, see Angular Workspace Configuration.
* package.json 
    * Configures npm package dependencies that are available to all projects in the workspace. See npm documentation for the specific format and contents of this file.
* package-lock.json
    * Provides version information for all packages installed into node_modules by the npm client. See npm documentation for details. If you use the yarn client, this file will be yarn.lock instead.
* src/ 	
    * Source files for the root-level application project.
* node_modules/ 	
    * Provides npm packages to the entire workspace. Workspace-wide node_modules dependencies are visible to all projects.
* tsconfig.json
    * Default TypeScript configuration for projects in the workspace.
* tslint.json 
    * Default TSLint configuration for projects in the workspace.

### Application Configuration Files
* browserslist 	
    * Configures sharing of target browsers and Node.js versions among various front-end tools. See Browserslist on GitHub for more information.
* karma.conf.js
    * Application-specific Karma configuration.
* tsconfig.app.json
    * Application-specific TypeScript configuration, including TypeScript and Angular template compiler options. See TypeScript Configuration.
* tsconfig.spec.json
    * TypeScript configuration for the application tests. See TypeScript Configuration.
* tslint.json
    * Application-specific TSLint configuration.
    
### Library Project Files
When you generate a library using the CLI (with a command such as ng generate library my-lib), the generated files go into the projects/ folder of the workspace. For more information about creating your own libraries, see https://angular.io/guide/creating-libraries
