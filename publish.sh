cp -r ./dist/images/*.png ./dist/styles
cp ./app/img.png ./dist/img.png
rsync -avh ./dist/* obseduc:/home/obssite/www/observatoriodaeducacao.org.br/mapas
