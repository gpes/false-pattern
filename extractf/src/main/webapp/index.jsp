<%-- 
    Document   : index
    Created on : Mar 15, 2018, 12:05:38 AM
    Author     : natan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>View</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    </head>
    
    
    <style>
        
        #table {
            width: 10px;
            margin-top: 20px;
        }
        
        .namePattern {
            background-color: #004d93; 
            color: white;
            font-size: 20px;
        }
        
        .termsOfElement {
            /*background-color: green;*/ 
            /*color: white;*/
            padding: 3px;
        }
        
        body {
            background-color: #f7f7f7;
            /*background-color: #c9dff2;*/
            /*background-color: #e6eff7;*/
             
        }
        
    </style>
    
    <body class="container-fluid">
        <h1>Visualização</h1>
        
        <select class="form-control" onchange="generete(this.value);">
            <option>Selecione um projeto</option>
            <option value="axion-1.0-M2">axion-1.0-M2</option>
            <option value="collections-3.2.1">collections-3.2.1</option>
            <option value="xerces-2.10.0">xerces-2.10.0</option>
            <option value="xalan-2.7.1">xalan-2.7.1</option>
            <option value="jext-5.0">jext-5.0</option>
        </select>
<!--        axion-1.0-M2
        collections-3.2.1
        xerces-2.10.0
        xalan-2.7.1
        jext-5.0-->
        <!--<input type="text" id="inputProjectName" placeholder="Nome do projeto"/>-->
        <!--<button class="btn btn-default" onclick="generete();">Gerar</button>-->
        
        <!--<ul id="content"></ul>-->
        
        <div class="table-responsive">
            <table class="table" id="table">
               
            </table>    
        </div>
        

    </body>
    
    <script>    
        
        async function fetchGetDatas(link) {
            let response = await fetch(link);
            let data = await response.json();
            // Promise
            return data;
        }
        
        async function fetchPostDatas(link, projectName) {
            let response = await fetch(link, {
                method: 'POST',
                body: projectName
            });
            
            let data = await response.json();
            
            return data;
        }
        
//        function changeValue(val) {
//            console.log(val);
//        }
        
        // Called in html
        async function generete(name) {
//            let name = document.getElementById('inputProjectName').value;
//            name = name.trim();
            if(name === "Selecione um projeto") name = "";
            
            let patterns = await fetchPostDatas('http://localhost:8080/extractf/patterns', name);
            
            let terms = await fetchPostDatas('http://localhost:8080/extractf/terms', name);
            
            let metric = await fetchPostDatas('http://localhost:8080/extractf/metric', name);
            
            let renderString = "";
            
            let existsPatterns = [];
            
            patterns.forEach(pattern => {
                let namePattern = pattern.namePattern;
                
                console.log(pattern)
                
                renderString += '<tr class="namePattern" id="'+ namePattern +'"><td class="col-md-6">' + namePattern + '</td> <td class="col-md-2">Terms</td> <td class="col-md-4">Metric   </td> </tr>';
                if(pattern.instances.length !== 0) {
                    existsPatterns.push(namePattern);
                }
                
                pattern.instances.forEach(instance => {
                       
                    let termsOfElement = "";
                    let metricOfElement = "";
                    
                    renderString += '<tr class="font"><td valign="top">';
                    
                    instance.roles.forEach(role => {
                        renderString += role.name + ' - ' + role.element + '<br>';
                    
                        terms.forEach(object => {
                            if(role.element === object.entityName) {
                                termsOfElement += '<span class="termsOfElement">' + object.entityName + '</span>' + '<br><br>';
                                
                                for(key in object.termsWithCounter) {
                                    termsOfElement += key + ': ' + object.termsWithCounter[key] + '<br>'
                                }
                                
                                termsOfElement += '<br><br>';
                            }
                        });
                        
                        for(key in metric) {
                            if(role.element == key) metricOfElement += 'Valor: ' + metric[key] + '<br>';
                        }
                    });
                    
                    
                    renderString += '</td> <td valign="top">' + termsOfElement + '</td> <td valign="top">' + metricOfElement + '</td> </tr>';
                    
                });
                
            });

            createContent(existsPatterns);

            document.getElementById('table').innerHTML = renderString; 
        }
        
        function createContent(listOfExistsPatterns) {
            let list = "";
            listOfExistsPatterns.forEach(element => {
                list += '<li> <a href="#'+ element +'">' + element + '</a></li>';
            });
            
//            document.getElementById('content').innerHTML = list;
        }
        
    </script>
</html>
