import subprocess
import sys
import os
import _thread


def main():

    lamner = ServerRunner()
    print(sys.argv[1])
    func = lamner.pickArgs(sys.argv[1])
    func()


class ServerRunner:
    def __init__(self):
        self.server = None
        self.port = 3000
        # self.location = ""

        self.currLoc = os.path.abspath(__file__)[:-len("runserver.py")]
        os.chdir("C:\\")
        pipout = subprocess.Popen(
            ["pip", "show", "codesummary"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )
        codeSummaryJSON, temp = pipout.communicate()
        start = str(codeSummaryJSON).find('Location: ') + len('Location: ')
        end = str(codeSummaryJSON).find('Requires: ')
        self.location = str(codeSummaryJSON)[start:end - 4]

    # Function to display correct button
    def ServerArg(self):
        # if (
        #     len(port) == 0
        #     or not port.isdigit()
        #     or (port := int(port)) < 0
        #     or port > 65535
        # ):
        #     port = 3000
        self.RunServer(self.port)

    def ShutdownArg(self):
        print("Shutting down the server")
        self.server.kill()

    def PipInstall(self):
        # os.system("pip install git+https://github.com/Nathan-Nesbitt/CodeSummary")

        os.chdir(f"{self.location}\\CodeSummary")

        os.system("mkdir CodeSummary")
        os.system("move models CodeSummary")
        os.system("move server CodeSummary")
        os.system("move Examples.py CodeSummary")

        os.system(f"cp {self.currLoc}\\main.py .")
        os.system(f"cp {self.currLoc}\\setup.py .")
        os.system(f"cp {self.currLoc}\\pyproject.toml .")
        os.system(f"cp {self.currLoc}\\README.md .")
        os.system(f"cp {self.currLoc}\\docker-compose.yml .")
        os.system(f"cp {self.currLoc}\\Dockerfile .")
        os.system(f"cp {self.currLoc}\\gunicorn.sh .")
        os.system(f"cp {self.currLoc}\\.env .")

        os.system("python -m venv venv")
        os.system(".\\venv\\Scripts\\pip.exe install .")
        os.system(
            ".\\venv\\Scripts\\pip.exe install python-dotenv"
        )
        print("end pipping")

    def RunServer(self, port):
        os.chdir(f"{self.location}\\CodeSummary")
        print("Running server on {0}".format(port))
        self.server = subprocess.Popen(
            [f"{self.location}\\CodeSummary\\venv\\Scripts\\flask.exe",
                "run", "--port", "3000"]
        )
        print("we're done!")

    def pickArgs(self, op):
        switch = {
            'install': self.PipInstall,
            'run': self.ServerArg,
            'shutdown': self.ShutdownArg,
        }
        return switch.get(op, "show me this instead!")


main()
