
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pieszynski_oncube&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pieszynski_oncube)

## Build 

```bash
docker build -t pieszynski/oncube:latest -t pieszynski/oncube:0.0.1 .
docker run -it --rm -p 8080:8080 --name oc pieszynski/oncube:latest

docker buildx build --platform linux/arm64,linux/amd64 -t pieszynski/oncube:latest -t pieszynski/oncube:0.0.1 . --push
```

## k8s

```bash
kubectl get all

kubectl apply -f config/deployment.yml
kubectl apply -f config/balancer.yml

kubectl logs -l app=oncube -f --timestamps --prefix

kubectl edit deployment/oncube

kubectl delete services -l app=oncube
kubectl delete deployments -l app=oncube
```
