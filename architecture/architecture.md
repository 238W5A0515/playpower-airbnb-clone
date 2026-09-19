# Production-scale architecture

The take-home asks for a high-level architecture for a vacation-rental marketplace covering frontend, backend, storage, search and deployment. The diagram supplied here uses a CDN/WAF front door, stateless web/API services, Redis caching, PostgreSQL with read replicas, object storage + image CDN, OpenSearch, Kafka-style asynchronous events, observability and multi-AZ/multi-region deployment.

For the take-home implementation, the actual clone remains frontend-only/static. The diagram represents how the product could evolve at production scale.
