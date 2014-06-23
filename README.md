qwotd-ext
=========

The Kango extension for Qwotd

OVERVIEW
========

Qwotd is a browser extension which adds social media annotation to news articles on the web, built on the Kango Extensions framework. It is compatible with Chrome, Firefox, and Safari, and could also be compatible with IE by contacting the Kango developers at extensions@kangoextensions.com. The extension takes the URL of the user's currently viewed tab, and searches Twitter for instances of that URL in tweets. Qwotd then saves all those tweets to a database, and displays data to the user about those tweets pertaining to the article (ex. quotes that have been tweeted, hashtags used with the article URL, favorited and retweeted tweets, etc.) through both the extension popup, opened by clicking on the Q logo, and highlighting of text in the article itself.

INSTALLATION AND SETUP
=====================

-Install Kango at kangoextensions.com

-Install Python 2.7

-Clone this repository

-Copy this repository into the root-level file of your Kango file

-Run "python kango.py build qwotd-ext" (this build creates a new Qwotd extension)

-Open your browser, and load the extension (In Chrome, go to chrome://extensions, click on "Load unpacked extension", and load from "Kango/qwotd-ext/output/(your browser extension)"

DEVELOPMENT
===========
-All development or changes to the extension must happen in the "qwotd-ext/src" file. Changing something in the output file will cause your changes to be overwritten the next time you build

-In the "src" folder, adjusting files in the "common" folder will cause the changes to apply for all browser extensions (this was done as default in initial development, so that the extension is compatible with as many browsers as possible)

-See the Kango Extension website's documentation for a description of the layout of the extension's files (background vs. content scripts)

