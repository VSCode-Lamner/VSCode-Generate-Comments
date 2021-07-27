from tkinter import *
import subprocess, sys, os

server = None 

# Function to display correct button
def ServerClick ():
    if serverButton.cget("text") == "Start Server":
        serverButton.configure(text="End Server")
        port = portTextField.get()
        RunServer(port)
    else:
        serverButton.configure(text="Start Server")
        shutdownServer()

def InstallClick ():
    print("Installing virtaul Environment")
    subprocess.run(["python", "-m", "venv", "venv"])
    subprocess.call([r'.\venv\Scripts\activate.bat'])
    print('starting pip install: this process may take some time')
    messageLabel.configure(text="pip install in progress: this process may take some time")
    subprocess.call([sys.executable, '-m', 'pip', 'install', '.'])
    print('end pipping')
    messageLabel.configure(text="pip install complete, click 'run server' button")


def RunServer (port):
    print("Running server on {0}".format(port))
    # subprocess.call([r'.\venv\Scripts\activate.bat'])
    
    subprocess.run( [r'.\venv\Scripts\activate.bat'])
    os.system( "$env:FLASK_APP = \"main:server\"")
    os.system()

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
    
    server = subprocess.Popen(["flask", "run", "--port", "3000"])


def shutdownServer():
    print("Shutting down the server")
    server.kill()


## Create Window
window = Tk()
window.title("Hello Lamner!!")
window.geometry("700x500")

## Create UI Elements
portLabel = Label(window, text="Choose Port #", font=("Georgia", 35))
messageLabel = Label(window, width=6, text="", font=("Georgia", 25))
portTextField = Entry(window, width=6, font=("Georgia", 35))

serverButton = Button(
    window, text="Start Server", command=ServerClick, font=("Georgia", 20)
)

installButton = Button(
    window, text = 'Install Server', command=InstallClick, font = ('Gerogia', 20)
)

## Position UI Elements
portLabel.grid(column=0, row=0)
portTextField.grid(column=1, row=0)
serverButton.grid(column=0, row=1)
installButton.grid(column=1, row=1)
messageLabel.grid(column=0, row=2)

portTextField.focus()

window.mainloop()
