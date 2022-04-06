
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pieszynski_oncube&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pieszynski_oncube)

## Build 

```bash
docker build -t pieszynski/oncube:latest -t pieszynski/oncube:0.0.1 .
docker run -it --rm -p 8080:8080 --name oc pieszynski/oncube:latest

docker buildx build --platform linux/arm64,linux/amd64 -t pieszynski/oncube:latest -t pieszynski/oncube:0.0.1 . --push
```

## k8s

* Do zarządzania graficznie: https://k8slens.dev/index.html

### kustomize

```bash
kubectl apply -k ingress-ctl/

kubectl kustomize ./kust

kubectl apply -k ./kust
```

### kubectl

```bash
kubectl get all

kubectl apply -f config/ns.yml
kubectl apply -f config/deployment.yml
kubectl apply -f config/balancer.yml
kubectl apply -f config/ing.yml

kubectl logs -l app=oncube -f --timestamps --prefix

kubectl edit deployment/oncube

kubectl set image deployment/oncube oncube=docker.io/pieszynski/oncube:0.0.2 
kubectl rollout status deployment oncube
kubectl rollout history deployment oncube
kubectl rollout undo deployment oncube

kubectl delete services -l app=oncube
kubectl delete deployments -l app=oncube
```

### REST API

```bash
kubectl proxy
curl http://localhost:8001/version
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
curl http://localhost:8001/api/v1/namespaces/test/pods/nginx-deployment-7c6796f5c-w6qp8/

curl http://localhost:8001/api/v1/namespaces/test/pods/nginx-deployment-7c6796f5c-w6qp8/proxy/

```
