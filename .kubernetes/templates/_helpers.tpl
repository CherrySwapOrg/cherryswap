{{/* Expand the name of the chart. */}}
{{- define "cherryswapChart.name" -}}
{{- default .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "cherryswapChart.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Common labels */}}
{{- define "cherryswapChart.labels" -}}
helm.sh/chart: {{ include "cherryswapChart.chart" . }}
{{ include "cherryswapChart.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/* Selector labels */}}
{{- define "cherryswapChart.selectorLabels" -}}
app.kubernetes.io/name: {{ include "cherryswapChart.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/* Create the name of the service account to use */}}
{{- define "cherryswapChart.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "cherryswapChart.name" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "cherryswapChart.issuer.name" -}}
{{- printf "issuer-%s" .Release.Name -}}
{{- end -}}

{{- define "cherryswapChart.issuer.deployment.name" -}}
{{- default (include "cherryswapChart.issuer.name" .) .Values.issuer.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Checksums */}}
{{- define "cherryswapChart.propertiesHash" -}}
{{- $secrets := include (print $.Template.BasePath "secrets.yaml") . | sha256sum -}}
{{- $config:= include (print $.Template.BasePath "config.yaml") . | sha256sum -}}
{{ print $secrets $config | sha256sum }}
{{- end -}}
