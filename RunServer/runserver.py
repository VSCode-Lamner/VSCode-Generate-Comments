from tkinter import *
import subprocess, sys, os


class RunServer ():

    def __init__(self) :
        ## Create Window
        window = Tk()
        window.title("Hello Lamner!!")
        window.geometry("700x500")

        ## Create UI Elements
        self.portLabel = Label(window, text="Choose Port #", font=("Georgia", 35))
        self.messageLabel = Label(window, width=6, text="", font=("Georgia", 25))
        self.portTextField = Entry(window, width=6, font=("Georgia", 35))

        self.serverButton = Button(
            window, text="Start Server", command=ServerClick, font=("Georgia", 20)
        )  

        self.installButton = Button(
            window, text = 'Install Server', command=InstallClick, font = ('Gerogia', 20)
        )

        ## Position UI Elements
        self.portLabel.grid(column=0, row=0)
        self.portTextField.grid(column=1, row=0)
        self.serverButton.grid(column=0, row=1)
        self.installButton.grid(column=1, row=1)
        self.messageLabel.grid(column=0, row=2)

        self.portTextField.focus()

        window.mainloop()

    # Function to display correct button
    def ServerClick (self):
        if self.serverButton.cget("text") == "Start Server":
            self.serverButton.configure(text="End Server")
            port = self.portTextField.get()
            RunServer(port)
        else:
            self.serverButton.configure(text="Start Server")
            shutdownServer()

    def InstallClick (self):
        print("Installing virtual Environment")
        # os.system('python -m venv venv & .\\venv\\Scripts\\activate ; pip install . ; deactivate')
        print('starting pip install: this process may take some time')
        self.messageLabel.configure(text="pip install in progress: this process may take some time")
        os.system("py -m venv venv")
        os.system(".\\venv\\Scripts\\pip.exe install .")
        os.system(".\\venv\\Scripts\\pip.exe install python-dotenv")
        with open(".env", "w") as env:
            env.write('FLASK_APP = "main:server"')
        print('end pipping')
        self.messageLabel.configure(text="pip install complete, click 'run server' button")

        


        # subprocess.run(["python", "-m", "venv", "venv"])
        # subprocess.call([r'.\venv\Scripts\activate.bat'])
        # subprocess.call([sys.executable, '-m', 'pip', 'install', '.'])


    def RunServer (self, port):
        print("Running server on {0}".format(port))
        self.server = subprocess.Popen(['.\\venv\\Scripts\\flask.exe', 'run', '--port', '3000'])

        print ("we're done!")
        # subprocess.call([r'.\venv\Scripts\activate.bat'])
        
        # subprocess.run
        # subprocess.Popen( [r'.\venv\Scripts\activate.bat', '&&', '$env:FLASK_APP', '=', r'"main:server"', '&&', 'flask', 'run', '--port', '3000'])
        # server = subprocess.Popen( [r'.\venv\Scripts\activate.bat', ';', '$env:FLASK_APP', '=', r'"main:server"', ';',  'flask', 'run', '--port', '3000'])
        
        # os.system( '.\\venv\\Scripts\\activate ; $env:FLASK_APP = \"main:server\" ; flask run --port 3000')

        
        # os.system( '.\\venv\\Scripts\\activate')
        # os.system( "$env:FLASK_APP = \"main:server\"")
    # .\venv\Scripts\activate ; $env:FLASK_APP = "main:server" ; flask run --port 3000
        # subprocess.run(
        #     ( [r'.\venv\Scripts\activate.bat'], ['.', 'venv/bin/activate.bat'] )[
        #         platform == 'darwin'
        #     ]
        # )
        # subprocess.run(
        #     ( ["$env:FLASK_APP", "=", '"main:server"'], ['export', 'FLASK_APP=main:server'] )[
        #         platform == 'darwin'
        #     ]
        # )
        
        # server = subprocess.Popen(["flask", "run", "--port", "{0}".format(port)])
        
        # server = subprocess.Popen(["flask", "run", "--port", "3000"])


    def shutdownServer(self):
        print("Shutting down the server")
        self.server.kill()



