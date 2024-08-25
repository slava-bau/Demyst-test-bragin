FROM golang:1.22 AS builder
WORKDIR /app
ENV GOARCH=arm64

COPY go.mod .
COPY . .
RUN go build -o demyst_backend

FROM --platform=linux/arm64 gcr.io/distroless/base-debian10
COPY --from=builder /app/demyst_backend /demyst_backend

ENV API_URL=http://show_money_source_api:3000/api.xro/2.0/Reports/BalanceSheet
ENV PORT=5000
ENV JSON_SOURCE=api

CMD ["/demyst_backend"]

EXPOSE 5000
