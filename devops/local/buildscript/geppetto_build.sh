#!bin/bash

APPLICATION='/dakishan'

CUSTOMSERVICEPATH='../../../services/custom_services'

HELMPATH='../devops/local'


WEBCODE='../../../application/client/web/dakishan'
WEBIMAGENAME='geppettotest/dakishan-web:1.0'

echo "Started to build docker images for pod...."


build_appbuilder_image () {

cd $WEBCODE
docker build -t $WEBIMAGENAME .
if [ $? -eq 0 ]; then
    kind load docker-image $WEBIMAGENAME
    echo "$WEBIMAGENAME is successfully pushed"
else
    echo "Image $WEBIMAGENAME-web:1.0 build failed"
fi

}


build_customservices(){

cd $CUSTOMSERVICEPATH

for d in * ; do
    
    echo "building : $d"
    cd $d
    if [ $? -eq 0 ]; then
        docker build -t geppettotest$APPLICATION-$d:1.0 .
        if [ $? -eq 0 ]; then
            echo "geppettotest$APPLICATION-$d:1.0 build succesfully"
            echo "Image loading into KIND...."
            # docker push geppettotest$APPLICATION-$d:1.0
            kind load docker-image geppettotest$APPLICATION-$d:1.0
            sleep 2
            cd ..
        else
            echo "geppettotest$APPLICATION-$d:1.0 build failed"
        fi        
    else
        echo "$d is not a folder!"
    fi
      
      done

}


clean_images(){

docker rmi -f $WEBIMAGENAME

for d in * ; do
    docker rmi -f geppettotest$APPLICATION-$d:1.0
    if [ $? -eq 0 ]; then
        echo "geppettotest$APPLICATION-$d:1.0 deleted"
        cd ..
    else
        echo "error in deleting geppettotest$APPLICATION-$d:1.0"
    fi
done

}

helm_install () {

cd $HELMPATH
helm install --dry-run --debug ./helm
helm install --name dakishan-6338 ./helm
if [ $? -eq 0 ]; then
    echo "App Deployment is Done"
else
    echo "App deployment is Failed, there is a problem with helm charts"
fi

}


build_appbuilder_image
build_customservices
clean_images
helm_install

