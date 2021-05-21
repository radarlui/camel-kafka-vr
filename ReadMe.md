Exposing Services integrating with Kafka using Camel
===========================

This Project uses Camel to integrate with Kafka and showcases different replay capabilities by handling offsets to move forward or backwards. It incorporates 3D views of the Kafka topic and Camel consumer to visually follow events and replays.

![Alt text](assets/swagger.png?raw=true "Title")
![Alt text](assets/3d-viewer.png?raw=true "Title")

    

To run in OpenShift:

1. Create a new project on OpenShift

		oc new-project <project_name>
		
2. Install AMQ Streams (Kafka on OpenShift) Operator and deploy a Kafka cluster with name my-cluster
		 

3. Deploy the demo application (Add a new parameter --kafka.broker to specify the correct Kafka boostrap URL in case the Kafka cluster name is not my-cluster)

		oc new-app java:8~https://github.com/radarlui/camel-kafka-vr -e JAVA_ARGS="--camelrest.host=camel-kafka-vr-<project_name>.apps.tyip.hklab-redhat.com"

4. Create services and routes to open 2 views for the application:

		Swagger REST API:            [camel-kafka-vr-rest]
		Topic and Consumer view:     [camel-kafka-vr-ui]
		
		oc expose deployments/camel-kafka-vr --name=camel-kafka-vr-ui --port=8290
		oc expose service/camel-kafka-vr
		oc expose service/camel-kafka-vr-ui
		oc expose service/camel-kafka-vr --name camel-kafak-vr-rest --path=/webjars/swagger-ui/2.1.0/index.html?url=/camel/api-docs --hostname=camel-kafka-vr-<project_name>.apps.tyip.hklab-redhat.com
    
5. After the build and deployment is finished, the application can be accessed through the following routes:

		Swagger REST API:            [camel-kafka-vr-rest]
		Topic and Consumer view:     [camel-kafka-vr-ui]		
