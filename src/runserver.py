import subprocess
import sys
import os


def main():

    lamner = ServerRunner()
    func = lamner.PickFunctionByArgs(sys.argv[1])
    func(sys.argv[2]) if len(sys.argv) > 2 else func()  

class ServerRunner:
    def __init__(self):
        self.server = None
        self.currentDirectory = os.path.abspath(__file__)[:-len("runserver.py")]
        
        # must find universal location to install codesummary server files
        os.chdir("C:\\")
        listAllPipPackages = subprocess.Popen(
            ["pip", "list", "-v"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        )
        pipInstallPackageList, unused = listAllPipPackages.communicate()
        packageListByLine = pipInstallPackageList.split(b'\n')
        packageListByLine = packageListByLine[2:]
        self.pipPackagesDirectory = ""
        for package in packageListByLine:
            self.pipPackagesDirectory = (    
                str( package )[
                    str( package ).find( "c:".lower() ) 
                    : str( package ).rfind(' ')
                ]
            )
            packageDirectoryByElement = self.pipPackagesDirectory.split('\\\\')
            if (
                packageDirectoryByElement[-1] == "site-packages".lower()
                and packageDirectoryByElement[-2] == "lib".lower()
            ): break

    def InstallServer(self):
        print("Beginning Server Installation!")
        os.chdir(f"{self.pipPackagesDirectory}")
        os.system("git clone https://github.com/Nathan-Nesbitt/CodeSummary.git")
        os.chdir(f"{self.pipPackagesDirectory}\\CodeSummary")
        os.system("python -m venv venv")
        os.system(".\\venv\\Scripts\\pip.exe install .")
        os.system(".\\venv\\Scripts\\pip.exe install python-dotenv")
        os.system(f"cp {self.currentDirectory}\\.env .")
        print("Server Installation Complete!")

    def RunServer(self, port):
        if (
            len(port) == 0
            or not port.isdigit()
            or (port := int(port)) < 0
            or port > 65535
        ): port = 3000
        
        os.chdir(f"{self.pipPackagesDirectory}\\CodeSummary")
        print(f"Running server on {port}")
        self.server = subprocess.Popen([
            f"{self.pipPackagesDirectory}\\CodeSummary\\venv\\Scripts\\flask.exe",
            "run", "--port", f"{port}"
        ])

    def PickFunctionByArgs(self, op):
        switch = {
            'install': self.InstallServer,
            'run': self.RunServer
        }
        return switch.get(op, "show me this instead!")


main()
