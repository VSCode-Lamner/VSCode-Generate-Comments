from tkinter import *
from os import *

# Function to display correct button
def clicked():
    if (controlButton.cget("text") == "Start Server"):
        controlButton.configure(text= "End Server")

        port = portTextField.get()
        RunServer(port)
    else:
        controlButton.configure(text= "Start Server")
        shutdownServer()


def RunServer(port):
    print(f'Running server on port {port}')
    # todo: add code to run on port
    return
    

def shutdownServer():
    print ("Shutting down the server")
    # todo: shut server down
    return

## Create Window
window = Tk()
window.title("Hello Lamner!!")
window.geometry('700x500')

## Create UI Elements
portLabel = Label(window, text= "Choose Port #",font= ("Georgia", 35))
portTextField = Entry(window, width= 6, font= ("Georgia", 35))
controlButton = Button(window, text= "Start Server", command= clicked, font= ("Georgia", 20))

## Position UI Elements
portLabel.grid(column=0, row=0)
portTextField.grid(column= 1, row= 0)
controlButton.grid(column= 0, row= 1)

portTextField.focus()

window.mainloop()