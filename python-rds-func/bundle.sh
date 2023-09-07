#!/usr/bin/env bash
echo "Bundling function for aws lambda ..."
rm function.zip
cd dist
zip -r $OLDPWD/function.zip .
cd $OLDPWD
zip -g function.zip main.py
echo "Done."