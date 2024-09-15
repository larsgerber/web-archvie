First build the project ``.\mvnw clean install`` | intelliJ > Maven > Lifecycle > insall

Build docker container, open in shell project folder
``docker build -t waterplaces .``

Run project on local machine 
``docker run --name waterplaces -p 8080:8080 waterplaces`` 
go to [localhost:8080](localhost:8080) for the site


Stop the container ``docker stop waterplaces``


Change name of the image for the push 
``docker tag waterplaces docker.unic.com/lars.gerber/waterplaces ``

login
``docker login docker.unic.com``
enter username & pw when requested

push
``docker push docker.unic.com/lars.gerber/waterplaces ``


Available in the unic net [https://waterplaces.unckc.kube24.net/spots](https://waterplaces.unckc.kube24.net)
