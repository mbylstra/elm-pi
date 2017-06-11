from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.hosts = ['192.168.0.10']
env.user = "pi"
env.password = "raspberry"

def test():
    code_dir = "/home/pi/code/elm-pi-drum-machine"
    with cd(code_dir):
        put('button-led.js', '.');
        run("node button-led.js")


