# coding=utf-8

import re
import urllib
import urllib2
# 1. 导入Python SSL处理模块
import ssl
from pyquery import PyQuery as pq
from bs4 import BeautifulSoup

import os
import re
import requests
import sys
import traceback
from datetime import datetime
from datetime import timedelta
from lxml import etree

# 2. 表示忽略未经核实的SSL证书认证
#context = ssl._create_unverified_context()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"}
def request_url(url):
    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)
    return response.read()

def find_child_word(href):
    url = 'https://www.hujiang.com' + href
    print url
    html = request_url(url)
    bsObj = BeautifulSoup(html, "html.parser")
    nameList = bsObj.findAll("div", {"class": "sp-lexicon-item"})

    words = href.replace('/ciku/', '').replace('/', '')
    words = 'this.words_1.push([\'' + words + '\', '
    save_file('\r\n\r\n' + words)
    fayin = ''
    for name in nameList:
        for child in name.children:
            fayin += child.string
    fayin = fayin.replace('\r', '').replace('\n', '').replace(';', '').replace('\'', '\\\'')
    fayin = '\'' + fayin.strip() + '\''
    save_file(fayin)
    nameList = bsObj.findAll("div", {"class": "sp-lexicon-word-comment clearfix"})

    word_desc = ''
    for name in nameList:
        for child in name.children:
            if child.name == 'br':
                word_desc += '/r/n'
            else:
                word_desc += child.string
    word_desc = word_desc.replace('\"', '')
    word_desc = ', \'' + word_desc.strip() + '\']);'
    save_file(word_desc)

def find_all(url):
    html = request_url(url)
    bsObj = BeautifulSoup(html, "html.parser")

    nameList = bsObj.findAll("li", {"class": "clearfix"})
    for name in nameList:
        for child in name.children:
            if child.name == 'a':
                find_child_word(child.attrs['href'])

def save_file(s):
    f = open("test_5.txt", "ab+")
    f.write("%s" % s)
    f.close()

#find_child_word('/ciku/after/')
#find_all("https://www.hujiang.com/ciku/zuixingaozhongcihui/")
find_all("https://www.hujiang.com/ciku/zuixinshangwucihui/")
for i in xrange(2, 300):
    url = 'https://www.hujiang.com/ciku/zuixinshangwucihui_' + str(i) + '/'
    print url
    find_all(url)

# d =pq(response.read())
# d('clearfix').html()

# bsObj=BeautifulSoup(request_url(url), "html.parser")
#
# nameList=bsObj.findAll("li",{"class":"clearfix"})
# for name in nameList:
#     # for ul in nameList.select('a'):
#     #     print ul
#    for child in name.children:
#        if child.name == 'a':
#            url = 'https://www.hujiang.com' + child.attrs['href']
#            request = urllib2.Request(url, headers=headers)
#            response = urllib2.urlopen(request)
#            html = response.read()

   #print(name.get_text())
# for ul in bsObj.select('a'):
#     print ul
    # if hasattr(ul.parent, 'class'):
    #     print ul.parent['class']
    # if ul.parent['class'] == 'clearfix':
    #     print(ul.attrs['href'])


