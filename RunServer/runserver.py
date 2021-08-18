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
        self.location = ""

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

    # def InstallArg(self):
    #     print("Installing virtual Environment")
    #     print("starting pip install: this process may take some time")

    #     _thread.start_new_thread(self.PipInstall, ())

    def PipInstall(self):
        os.system("pip install git+https://github.com/Nathan-Nesbitt/CodeSummary")
        currLoc = os.path.abspath(__file__)[:-len("runserver.py")]
        os.chdir("C:\\")
        pipout = subprocess.Popen(
            ["pip", "show", "codesummary"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )

        codeSummaryJSON, temp = pipout.communicate()
        print(self.location)
        start = str(codeSummaryJSON).find('Location: ') + len('Location: ')
        end = str(codeSummaryJSON).find('Requires: ')
        self.location = str(codeSummaryJSON)[start:end - 4]
        print(self.location)

        os.chdir(f"{self.location}\\CodeSummary")

        os.system("mkdir CodeSummary")
        os.system("move models CodeSummary")
        os.system("move server CodeSummary")
        os.system("move Examples.py CodeSummary")

        os.system(f"cp {currLoc}\\main.py .")
        os.system(f"cp {currLoc}\\setup.py .")
        os.system(f"cp {currLoc}\\pyproject.toml .")
        os.system(f"cp {currLoc}\\README.md .")

        os.system(f"python -m venv {self.location}\\venv")
        os.system(f"{self.location}\\venv\\Scripts\\pip.exe install .")
        os.system(
            f"{self.location}\\venv\\Scripts\\pip.exe install python-dotenv")
        with open(f"{self.location}\\.env", "w") as env:
            env.write('FLASK_APP = "main:server"')
        print("end pipping")

    def RunServer(self, port):
        print("Running server on {0}".format(port))
        self.server = subprocess.Popen(
            [f"{self.location}\\venv\\Scripts\\flask.exe", "run", "--port", "3000"]
        )
        print("we're done!")

    def pickArgs(self, op):
        switch = {
            'install': self.PipInstall,
            'run': self.ServerArg,
            'shutdown': self.ShutdownArg,
        }
        return switch.get(op, "show me this instead!")
        # if (op == 'install'):
        #     self.PipInstall()
        # elif (op == 'run'):
        #     self.RunServer()
        # elif (op == 'shutdown'):
        #     self.ShutdownArg()


main()
