#!/usr/bin/env bash
echo "Bundling function for aws lambda ..."
rm function.zip || echo "no function.zip to delete"
rm dist -rf
mkdir dist -p
pip install -r requirements.txt --target dist
pip install --platform manylinux2014_x86_64 --target=dist --implementation cp --python-version 3.11 --only-binary=:all: --upgrade psycopg2-binary
cd dist
zip -r $OLDPWD/function.zip .
cd $OLDPWD
zip -g function.zip main.py
echo "Done."