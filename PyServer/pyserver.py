# base python modules
import os

# import random
# import json
# import datetime

from http.server import BaseHTTPRequestHandler, HTTPServer
from mimetypes import guess_type



     # -- --- --- --- --- --- ()   PREPARE SERVER
    #   
    #
     # -- --- --- --- --- --- --- --- -- ()

hostName = "localhost"
serverPort = 8010


# this is where the server looks for files requested by the browser
## rootdir = str(os.path.dirname( os.path.abspath(__file__) )) + r"/html"

# change to the html rootdir directory
## os.chdir(rootdir)


    ## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##




     # -- --- --- --- --- --- ;;   server
    #   
    #
     # -- --- --- --- --- --- --- --- -- ;;

class   Server(BaseHTTPRequestHandler):


         # -- --- --- --- --- --- ()   do _ POST
        #
        #   this function responds to POST requests
        #
         # -- --- --- --- --- --- --- --- -- ()

    def do_POST(self):

        body = str(self.rfile.read(int(self.headers['Content-Length'])) )
        eq = body.find('=')
        print(body)
        print(body[:eq])


        uri = self.path
        p = uri.rfind('.')
        ext = uri[p:]

    # ##  get the positions of sentinel tokens
    #     qmark = uri.rfind('?')

    # ##  There is no query in the request
    #     if qmark == -1:
    #         path = uri
    #         p = path.rfind('.')
    #         query = ""
    #         ext = path[p:]
    # ##  parse the query from the request
    #     else:
    #         path = uri[:qmark]
    #         p = path.rfind('.')
    #         query = uri[qmark+1:]
    #         ext = uri[p:qmark]
    #     #...


## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##

    ##  parse the query for the required account data
        # params = dict(
        #     filter(
        #         lambda x : len(x)==2,
        #         [x.split("=") for x in query.split("&")]
        #     )
        # )

## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##


    ##  does  this GET request require us to execute a script?
        if (
            ext == ".php" 
            or ext == ".bin" 
            or ext == ".py"
            or ext == ".ico"
            or ext == ".html"
            or ext == ".css"
            or ext == ".js"
        ):
            notImplemented(self)
            return
        #...

        elif body[:eq] == "b'input":
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-type", "text/plain; charset=utf-8")
            self.send_header("X-Content-Type-Options", "no-sniff")
            self.end_headers()
            self.wfile.write(
                ('''
                So you wanna comment eh?
                ''').encode("utf-8")
            )
        #...

        else:
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-type", "text/plain; charset=utf-8")
            self.send_header("X-Content-Type-Options", "no-sniff")
            self.end_headers()
            self.wfile.write(
                ('''
                Are you here just to say hi?
                ''').encode("utf-8")
            )
        #...
    
    #... (do_POST)


        ## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##




         # -- --- --- --- --- --- ##   TO BE IMPLEMENTED
        #        
        # 
         # -- --- --- --- --- --- --- --- -- ##

    def do_HEAD (self):    notImplemented(self)
    def do_GET (self):     notImplemented(self)
    def do_PUT (self):     notImplemented(self)
    def do_UPDATE (self):  notImplemented(self)
    def do_DELETE (self):  notImplemented(self)
    def do_CONNECT (self): notImplemented(self)
    def do_OPTIONS (self): notImplemented(self)
    def do_TRACE (self):   notImplemented(self)
    def do_PATCH (self):   notImplemented(self)


        ## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##

#... (Server)


    ## - --- --- --- --- ,,, --- '''  pXq ''' --- ,,, --- --- --- --- - ##




     # -- --- --- --- --- --- ()   not Implemented
    #
    #
     # -- --- --- --- --- --- --- --- -- ()

def  notImplemented(self):

##  501 Not Implemented
    self.send_response(501)
    self.send_header("Content-type","text/html")
    self.end_headers()
#...


    ## - --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- - ##




     # -- --- --- --- --- --- ()   RUN SERVER
    #
    #   only  run the server if this module was called from the command line.
    #   python  makes the name different if this module is called by another module.
    #
     # -- --- --- --- --- --- --- --- -- ()

if  __name__ == "__main__":

    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass
        # stat.end()
    #...

    webServer.server_close()
    print("Server stopped.")
#...