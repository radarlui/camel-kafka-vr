

        function initWebSocket() {

        	var ws;
            
            if ("WebSocket" in window) {
               console.log("WebSocket is supported by your Browser!");
               
               // Let us open a web socket
               //var ws = new WebSocket("ws://localhost:9998/echo");
               ws = new WebSocket(((window.location.protocol === 'https:') ? 'wss://' : 'ws://') + window.location.host + '/camel/eventOffset');
             //localhost:8080/myapp/mysocket
    			
               ws.onopen = function() {
                  //nothing to do
               };
    			
               ws.onclose = function() {
                  // websocket is closed.
                  console.log("Connection is closed..."); 
               };
            } else {
               // The browser doesn't support WebSocket
               alert("WebSocket NOT supported by your Browser!");
            }

            return ws;
         }


      function startConsumer()
      {
        let scene = document.getElementById("scene");
        
        let pipe = document.createElement('a-box')
        pipe.setAttribute('position', {x: 0, y: 0, z: 0})
        pipe.setAttribute('height', .7)
        pipe.setAttribute('width' , 6)
        pipe.setAttribute('depth' , .3)
        pipe.setAttribute('side', "double")
        pipe.setAttribute('color', "grey")
        pipe.setAttribute('opacity', ".5")
        
        scene.appendChild(pipe)
        
        var processor = document.createElement('a-text')
        processor.setAttribute('value', 'Camel Kafka Consumer')
        processor.setAttribute('scale', "2 2 2")
        processor.setAttribute('align', 'center')
        processor.setAttribute('color', 'grey')
        scene.appendChild(processor);
        processor.setAttribute('position', {y: -0.7})
        
      }
      
      function consumeEventArray(array)
      {        
        let delay = 0;
        
        for(var i = 0; i < array.length; i++) {
          doSetTimeout(array[i], delay+=500)
        }
      }
      
      //needs independent function to copy values into setTimeout
      function doSetTimeout(item, delay) {
        setTimeout(function(){ consumeEvent(item)}, delay);
      }
      
      function consumeEvent(item)
      {
        posY = 0;
        var msg;
      
        msg = document.createElement('a-box')
        msg.setAttribute('position', {x: -10, y: posY, z: 0})
        msg.setAttribute('height', .5)
        msg.setAttribute('width' , .5)
        msg.setAttribute('depth' , .2)
        msg.setAttribute('side', "double")
        msg.setAttribute('color', "red")
        // msg.setAttribute('opacity', ".9")
        
        var number = document.createElement('a-text')
        number.setAttribute('value', item)
        number.setAttribute('align', 'center')
        number.setAttribute('scale', "2 2 2")
        msg.appendChild(number);
        number.setAttribute('position', {z: 0.148})
     
        let target = {  x: -3+.6,
                        y: posY, 
                        z: 0}
        
        msg.setAttribute(
            'animation',
            {  property: 'position', 
               dur: '1000', 
               delay: 0, 
               to: target,
               easing: 'easeOutQuad'
            });
       
        // let from = {  x: -3+.6,
        //                 y: posY, 
        //                 z: 0}
        
        let from = target;
        
        target = {  x: 3-.6,
                        y: posY, 
                        z: 0}
  
          msg.setAttribute(
            'animation__2',
            {  property: 'position', 
               dur: '3000', 
               delay: 950, 
               from: from,
               to: target,
               // easing: 'easeOutQuad'
            });

        
        
          msg.setAttribute(
            'animation__color',
            {  property: 'color', 
               dur: '3000', 
               delay: 1150, 
               // from: 'red',
               from: '#FF0000',
               to: '#00FF00',
               // easing: 'easeOutQuad'
            });
        
          
          msg.setAttribute(
            'animation__4',
            {  property: 'position', 
               dur: '1000', 
               delay: 3950, 
               from: target,
               to: "15 "+posY+" 0",
               // easing: 'easeOutQuad'
            });
          
          
          //listens animation end
          msg.addEventListener('animationcomplete', function cleanAnimation(evt) {

        	  //console.log("name detail: "+ evt.detail.name)
        	  
        	  //if (evt.detail.name = "animation__4")

        	  let pos = this.getAttribute("position").x
        	  
            if (pos == 15)
        	  {
	              //delete listener
	              this.removeEventListener('animationcomplete', cleanAnimation);
	
	              //delete animation
	              this.removeAttribute('animation');
	              
	              this.parentElement.removeChild(this);
        	  }
          }); 
          
          
          
        scene.appendChild(msg);  
        
        
      }