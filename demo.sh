#!/bin/bash
jsonpath='./projects.json'
obj = cat $jsonpath
 
for element in $obj
#也可以写成for element in ${array[*]}
do
echo $element
done