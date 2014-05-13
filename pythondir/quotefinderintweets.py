import re
import cgi


def quotefinder (tweettext):
	quotes = re.findall(r'\"(.+?)\"', tweettext)

	if (quotes == "none"):
		return false
	else:
		return quotes

	
def main():
	tweet = """dfjsdlkfj "here's the quote" jksdfjsdl "here's a quote2" gvgvynv 'jhj "uy" ghjhg' """
	print quotefinder(tweet)

main()