#!/bin/bash

# Verificar si jq está instalado
if ! command -v jq &> /dev/null
then
    echo "jq no está instalado. Por favor, instálalo y vuelve a intentar."
    exit 1
fi

# Función para recorrer directorios y obtener nombres de archivos con sus rutas completas
function list_files {
    local dir="$1"
    local indent="$2"
    local json=""

    # Listar archivos y subdirectorios
    for entry in "$dir"/*
    do
        if [ -d "$entry" ]; then
            # Si es un directorio, llamar recursivamente
            local subjson=$(list_files "$entry" "$indent  ")
            json="$json{\"name\": \"$(basename "$entry")\", \"path\": \"$entry\", \"type\": \"directory\", \"children\": $subjson},"
        else
            # Si es un archivo, añadirlo al JSON
            json="$json{\"name\": \"$(basename "$entry")\", \"path\": \"$entry\", \"type\": \"file\"},"
        fi
    done

    # Remover la última coma y envolver en un array
    json="[$(echo "$json" | sed 's/,$//')]"
    echo "$json"
}

# Directorio raíz (puedes cambiarlo a la ruta que desees)
root_dir="."

# Obtener el listado de archivos y convertir a JSON
file_list_json=$(list_files "$root_dir" "")

# Guardar el JSON en un archivo
echo "$file_list_json" | jq . > files.json

echo "El listado de archivos se ha guardado en files.json"
