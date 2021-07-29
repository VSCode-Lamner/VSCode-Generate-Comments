from tkinter import *
import subprocess, sys, os


def main():
    lamner = ServerRunner()


class ServerRunner:
    def __init__(self):
        ## Create Window
        self.window = Tk()
        self.window.title("Hello Lamner!!")
        self.window.geometry("700x500")

        ## Create UI Elements
        self.portLabel = Label(self.window, text="Choose Port #", font=("Georgia", 35))
        self.messageLabel = Label(self.window, width=6, text="", font=("Georgia", 25))
        self.portTextField = Entry(self.window, width=6, font=("Georgia", 35))

        self.serverButton = Button(
            self.window,
            text="Start Server",
            command=self.ServerClick,
            font=("Georgia", 20),
        )

        self.installButton = Button(
            self.window,
            text="Install Server",
            command=self.InstallClick,
            font=("Gerogia", 20),
        )

        ## Position UI Elements
        self.portLabel.grid(column=0, row=0)
        self.portTextField.grid(column=1, row=0)
        self.serverButton.grid(column=0, row=1)
        self.installButton.grid(column=1, row=1)
        self.messageLabel.grid(column=0, row=2)

        self.portTextField.focus()

        self.window.mainloop()

    # Function to display correct button
    def ServerClick(self):
        if self.serverButton.cget("text") == "Start Server":
            self.serverButton.configure(text="End Server")
            port = self.portTextField.get()
            self.RunServer(port)
        else:
            self.serverButton.configure(text="Start Server")
            self.ShutdownServer()

    def InstallClick(self):
        print("Installing virtual Environment")
        # os.system('python -m venv venv & .\\venv\\Scripts\\activate ; pip install . ; deactivate')
        print("starting pip install: this process may take some time")
        self.messageLabel.configure(
            text="pip install in progress: this process may take some time"
        )
        os.system("py -m venv venv")
        os.system(".\\venv\\Scripts\\pip.exe install .")
        os.system(".\\venv\\Scripts\\pip.exe install python-dotenv")
        with open(".env", "w") as env:
            env.write('FLASK_APP = "main:server"')
        print("end pipping")
        self.messageLabel.configure(
            text="pip install complete, click 'run server' button"
        )

    def RunServer(self, port):
        print("Running server on {0}".format(port))
        self.server = subprocess.Popen(
            [".\\venv\\Scripts\\flask.exe", "run", "--port", "3000"]
        )
        print("we're done!")

    def ShutdownServer(self):
        print("Shutting down the server")
        self.server.kill()


main()
