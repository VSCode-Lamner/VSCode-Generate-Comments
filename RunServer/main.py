from tkinter import *
import subprocess
from sys import platform

server = None 
venv = None

# Function to display correct button
def clicked():
    if controlButton.cget("text") == "Start Server":
        controlButton.configure(text="End Server")
        port = portTextField.get()
        RunServer(port)
    else:
        controlButton.configure(text="Start Server")
        shutdownServer()


def RunServer(port):
    # print(f"Running server on port {port}")
    print("Running server on {0}".format(port))
    venv = subprocess.Popen(["python", "-m", "venv", "venv"])
    subprocess.run(
        ( ['.\\venv\\Scripts\\activate'], ['.', 'venv/bin/activate'] )[
            platform == 'darwin'
        ]
    )
    subprocess.run(["pip", "install", "."])
    subprocess.run(
        ( ["$env:FLASK_APP", "=", '"main:server"'], ['export', 'FLASK_APP=main:server'] )[
            platform == 'darwin'
        ]
    )
    # server = subprocess.Popen(["flask", "run", "--port", "{0}".format(port)])
    server = subprocess.Popen(["flask", "run", "--port", "3000"])


def shutdownServer():
    print("Shutting down the server")
    server.kill()
    venv.kill()


## Create Window
window = Tk()
window.title("Hello Lamner!!")
window.geometry("700x500")

## Create UI Elements
portLabel = Label(window, text="Choose Port #", font=("Georgia", 35))
portTextField = Entry(window, width=6, font=("Georgia", 35))
controlButton = Button(
    window, text="Start Server", command=clicked, font=("Georgia", 20)
)

## Position UI Elements
portLabel.grid(column=0, row=0)
portTextField.grid(column=1, row=0)
controlButton.grid(column=0, row=1)

portTextField.focus()

window.mainloop()
