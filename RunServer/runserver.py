from tkinter import *
import subprocess, sys, os
from time import sleep
import asyncio



def main():
    lamner = ServerRunner()


class ServerRunner:
    def __init__(self):
        ## Create Window
        self.window = Tk()
        self.window.title("Hello Lamner!!")
        self.window.geometry("750x250")
        self.window.protocol('WM_DELETE_WINDOW', self.OnExit)

        self.server = None

        ## Create UI Elements
        self.portLabel = Label(self.window, text="Choose Port #", font=("Georgia", 30))
        self.defPortLabel = Label(self.window, text="Default port is 3000", font=("Georgia", 18))
        self.messageLabel = Message(self.window, anchor="w", width=400, text="", font=("Georgia", 16))
        self.portTextField = Entry(self.window, width=6, font=("Georgia", 35))

        self.serverButton = Button(
            self.window,
            text="Start Server",
            command=self.ServerClick,
            font=("Georgia", 20),
            bg="#5cb85c",
            borderwidth=4,
            padx=4,
            pady=4
        )

        self.installButton = Button(
            self.window,
            text="Install Server",
            command=self.InstallClick,
            font=("Gerogia", 20),
            bg="#0275d8",
            borderwidth=4,
            padx=4,
            pady=4
        )

        # Grid.grid_configure(self.window, padx=4, pady=4)

        ## Position UI Elements
        self.portLabel.grid(column=0, row=0)
        self.portTextField.grid(column=1, row=0)
        self.defPortLabel.grid(column=2, row=0)
        self.serverButton.grid(column=0, row=1, pady=(50, 15))
        self.installButton.grid(column=2, row=1, pady=(50, 15))
        self.messageLabel.grid(column=0, row=2, sticky="w", columnspan=3)

        self.portTextField.focus()

        self.window.mainloop()

    # Function to display correct button
    def ServerClick(self):
        if self.serverButton.cget("text") == "Start Server":
            self.serverButton.configure(text="End Server", bg="#d9534f")
            port = self.portTextField.get()

            if ( 
                len(port) == 0 
                or type(port) != int
                or port < 0
                or port > 65535
            ): port = 3000

            self.RunServer(port)
        else:
            self.serverButton.configure(text="Start Server", bg="#5cb85c")
            self.ShutdownServer()

    def InstallClick(self):
        print("Installing virtual Environment")
        print("starting pip install: this process may take some time")
        self.messageLabel.configure(
            text="pip install in progress: this process may take some time"
        )
        asyncio.loop.run_until_complete(asyncio.loop.create_task(self.PipInstall()))
        


    async def PipInstall (self):
        await asyncio.sleep(5)
        os.system("py -m venv venv")
        # temp = subprocess.Popen(['py', '-m', 'venv', 'venv'])
        # temp = subprocess.Popen(['.\\venv\\Scripts\\pip.exe', 'install', '.'])
        # temp = subprocess.Popen(['.\\venv\\Scripts\\pip.exe', 'install', 'python-dotenv'])
        # temp = subprocess.Popen(['py', '-m', 'venv', 'venv'])
        # temp = subprocess.Popen(['.\\venv\\Scripts\\pip.exe', 'install', '.'])
        # temp = subprocess.Popen(['.\\venv\\Scripts\\pip.exe', 'install', 'python-dotenv'])
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
        self.messageLabel.configure(
            # text="pip install in progress: this process may take some time"
            text="Server is Running"
        )
        self.server = subprocess.Popen(
            [".\\venv\\Scripts\\flask.exe", "run", "--port", "3000"]
        )
        print("we're done!")

    def ShutdownServer(self):
        print("Shutting down the server")
        self.messageLabel.configure(
            text="Server is shut down"
        )
        self.server.kill()


    def OnExit(self):
        if (self.server): self.server.kill()
        self.window.destroy()


main()
