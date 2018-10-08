Exposing Services integrating with Kafka using Camel
===========================

This Project uses Camel to integrate with Kafka and showcases different replay capabilities by handling offsets to move forward or backwards. It incorporates 3D views of the Kafka topic and Camel consumer to visually follow events and replays.

![Alt text](assets/swagger.png?raw=true "Title")
![Alt text](assets/3d-viewer.png?raw=true "Title")


To run locally:

1. Download KAFKA
		
2. Start Zookeeper

		bin/zookeeper-server-start.sh config/zookeeper.properties
		
3. Start Kafka Broker

		bin/kafka-server-start.sh config/server.properties
	
4. Create a topic called test
		
		bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
	
5. Run the App
    	
    	mvn spring-boot:run

6. View REST operations with swagger UI    
    	
    	http://localhost:8080/webjars/swagger-ui/2.1.0/index.html?url=/camel/api-docs#/
    
    
7. To clean topic, delete and recreate with no consumers running
    	
		bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic test

8. Graphical view

		(local)
		http://localhost:8290/
		http://localhost:8290/topicview.html
    

To run in OpenShift:

1. Deploy Strimzi (Kafka on OpenShift)
		
		http://strimzi.io/documentation/

2. Create 'test' topic in Strimzi

		oc apply -f ocp/kafkatopic.yml

3. Ensure the following route definitions point to your OCP environment (field 'host')

		swagger-std-route.yml
		topicview-route.yml

4. Deploy project where in Strimzi's namespace

		mvn -P ocp fabric8:deploy

5. The deployed application contains routes to open all 3 views:

		Swagger REST API: [camel-kafka-vr-svc-swagger]
		Default view:     [camel-kafka-vr]
		Topic view:       [camel-kafka-vr-topicview]
    
