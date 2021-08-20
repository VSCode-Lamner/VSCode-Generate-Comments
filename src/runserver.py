import subprocess
import sys
import os
import _thread


def main():

    lamner = ServerRunner()
    func = lamner.pickArgs(sys.argv[1])
    if (len(sys.argv) > 2):
        func(sys.argv[2])
    else:
        func()


class ServerRunner:
    def __init__(self):
        self.server = None

        self.currLoc = os.path.abspath(__file__)[:-len("runserver.py")]
        os.chdir("C:\\")
        pipout = subprocess.Popen(
            ["pip", "list", "-v"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )
        pipLocations, temp = pipout.communicate()
        lines = pipLocations.split(b'\n')
        self.location = str(lines[2])[str(lines[2]).find(
            "c:"):str(lines[2]).rfind(' ')]

    def ShutdownArg(self):
        print("Shutting down the server")
        self.server.kill()

    def PipInstall(self):
        os.chdir(f"{self.location}")
        os.system("git clone https://github.com/Nathan-Nesbitt/CodeSummary.git")
        os.chdir(f"{self.location}\\CodeSummary")
        os.system("python -m venv venv")
        os.system(".\\venv\\Scripts\\pip.exe install .")
        os.system(
            ".\\venv\\Scripts\\pip.exe install python-dotenv"
        )
        os.system(f"cp {self.currLoc}\\.env .")
        print("end pipping")

    def RunServer(self, port):
        if (
            len(port) == 0
            or not port.isdigit()
            or (port := int(port)) < 0
            or port > 65535
        ):
            port = 3000
        os.chdir(f"{self.location}\\CodeSummary")
        print(f"Running server on {port}")
        self.server = subprocess.Popen(
            [f"{self.location}\\CodeSummary\\venv\\Scripts\\flask.exe",
                "run", "--port", f"{port}"]
        )

    def DoNothing(self):
        print("I'm python!")
        # pass

    def pickArgs(self, op):
        switch = {
            'install': self.PipInstall,
            'run': self.RunServer,
            'shutdown': self.ShutdownArg,
            'test': self.DoNothing
        }
        return switch.get(op, "show me this instead!")


main()
