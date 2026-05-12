from flask import Flask, render_template, request, jsonify, session
import json

app = Flask(__name__)
app.secret_key = "survival_guide_secret_2026"

# Filtro para enumerate en Jinja2
app.jinja_env.filters['enumerate'] = enumerate

SECTIONS = {
    "reglas": {
        "id": "reglas",
        "orden": 1,
        "titulo": "La Cámara de las Reglas",
        "descripcion": "Aquí aparecen las normas sagradas de convivencia y asistencia. Conoce las leyes que rigen este semestre.",
        "contenido": [
            {
                "subtitulo": "Normas de Convivencia",
                "puntos": [
                    "Respeto total entre compañeros y con el profesor.",
                    "Participación activa y de calidad universitaria obligatoria.",
                    "Uso de LLMs (ChatGPT, Claude, etc.) SOLO para aprender e investigar. Se tomarán medidas en caso de mal uso.",
                    "Los trabajos deben reflejar comprensión real, no copia directa de IA.",
                ]
            },
            {
                "subtitulo": "Política de Asistencia",
                "puntos": [
                    "La asistencia puntual es obligatoria.",
                    "Respetar los tiempos de entrega es parte del desempeño evaluado.",
                    "Commits y Push regulares en tu repositorio son evidencia de trabajo continuo.",
                    "Trabajos completos en Classroom en tiempo y forma.",
                ]
            },
            {
                "subtitulo": "Formato de Entregas",
                "puntos": [
                    "Portada obligatoria: diseño libre, debe incluir logo, tema, datos del alumno y materia.",
                    "Conclusión de aprendizaje: descripción de lo que aprendiste en cada entrega.",
                    "Evidencias en GitHub: todos los proyectos prácticos deben tener repositorio.",
                    "Video reportes para prácticas y actividades que lo requieran.",
                ]
            }
        ],
        "preguntas": [
            {
                "id": "q1",
                "texto": "¿Para qué se permite usar LLMs (como ChatGPT o Claude) en esta materia?",
                "opciones": [
                    "Para copiar y pegar código sin entenderlo",
                    "Para aprender e investigar",
                    "Para reemplazar la asistencia a clases",
                    "No están permitidos bajo ninguna circunstancia"
                ],
                "correcta": 1
            },
            {
                "id": "q2",
                "texto": "¿Qué elementos debe incluir OBLIGATORIAMENTE la portada de tus entregas?",
                "opciones": [
                    "Solo el nombre del alumno y la fecha",
                    "Logo, tema, datos del alumno y materia",
                    "Únicamente el nombre de la práctica",
                    "Foto del alumno y número de control"
                ],
                "correcta": 1
            }
        ]
    },

    "notas": {
        "id": "notas",
        "orden": 2,
        "titulo": "El Oráculo de las Notas",
        "descripcion": "El oráculo revela los porcentajes que determinan tu destino académico. Conoce exactamente cómo se calcula tu calificación.",
        "contenido": [
            {
                "subtitulo": "Porcentajes de Evaluación",
                "puntos": [
                    "1P → Conocimiento 40% | Desempeño 20% | Producto 30% | Proyecto Integrador 10%",
                    "2P → Conocimiento 40% | Desempeño 20% | Producto 30% | Proyecto Integrador 10%",
                    "3P → Conocimiento 10% | Desempeño 10% | Producto 30% | Proyecto Integrador 50%",
                ]
            },
            {
                "subtitulo": "Teoría — Evidencias de Conocimiento",
                "puntos": [
                    "Actividades numeradas: Actividad 1, 2, … n",
                    "Investigaciones documentadas",
                    "Mapas conceptuales y mentales",
                    "Cuestionarios de comprensión",
                    "Exposiciones ante el grupo",
                ]
            },
            {
                "subtitulo": "Práctica — Evidencias de Desempeño",
                "puntos": [
                    "Prácticas numeradas: Práctica 1, 2, … n",
                    "Reportes escritos de cada práctica",
                    "Video reportes demostrando el funcionamiento",
                    "Evidencias en GitHub: commits y push obligatorios",
                ]
            },
            {
                "subtitulo": "Producto — Evidencias",
                "puntos": [
                    "Participación activa en clase",
                    "Trabajos completos subidos a Classroom",
                    "Commits y Push constantes en tu repositorio",
                    "Respeto estricto a los tiempos de entrega",
                    "Calidad universitaria en todo lo entregado",
                ]
            },
            {
                "subtitulo": "Proyecto Integrador",
                "puntos": [
                    "Proyecto didáctico de la materia en equipo asignado.",
                    "Incluye temas de la materia + background tecnológico.",
                    "Una entrega formal por parcial.",
                    "Se recomienda preguntar dudas constantemente al profesor.",
                ]
            }
        ],
        "preguntas": [
            {
                "id": "q3",
                "texto": "¿Cuánto vale el Proyecto Integrador en el 3P?",
                "opciones": [
                    "10%",
                    "20%",
                    "30%",
                    "50%"
                ],
                "correcta": 3
            },
            {
                "id": "q4",
                "texto": "¿Qué porcentaje tiene Evidencia de Conocimiento en el 1P?",
                "opciones": [
                    "10%",
                    "20%",
                    "30%",
                    "40%"
                ],
                "correcta": 3
            }
        ]
    },

    "skills": {
        "id": "skills",
        "orden": 3,
        "titulo": "Skills a Desbloquear",
        "descripcion": "Aquí se revelan los poderes que adquirirás al dominar esta materia. Tu personaje evolucionará con cada unidad superada.",
        "contenido": [
            {
                "subtitulo": "Objetivo General",
                "puntos": [
                    "Desarrollar aplicaciones móviles funcionales utilizando tecnologías modernas.",
                    "Dominar el ciclo completo: diseño, programación y despliegue de apps móviles.",
                    "Aplicar buenas prácticas de desarrollo y control de versiones.",
                    "Comunicar aplicaciones con APIs externas e internas.",
                ]
            },
            {
                "subtitulo": "Unidad 1 — Introducción a Aplicaciones Móviles",
                "puntos": [
                    "Fundamentos del ecosistema de desarrollo móvil.",
                    "Configuración del entorno de desarrollo.",
                    "Introducción a JavaScript (JS) para aplicaciones móviles.",
                    "Primeros pasos con React Native.",
                ]
            },
            {
                "subtitulo": "Unidad 2 — Programación de Aplicaciones Móviles",
                "puntos": [
                    "Componentes en React Native: estructura y reutilización.",
                    "Screens (pantallas): navegación entre vistas.",
                    "Navigations: Stack, Tab y Drawer navigation.",
                    "Comunicación con APIs: fetch, axios, REST.",
                ]
            },
            {
                "subtitulo": "Unidad 3 — Despliegue de Aplicaciones Móviles",
                "puntos": [
                    "Preparación de la app para producción.",
                    "Generación de builds (APK / IPA).",
                    "Publicación y distribución de la aplicación.",
                    "Documentación y presentación del proyecto final.",
                ]
            }
        ],
        "preguntas": [
            {
                "id": "q5",
                "texto": "¿Cuál es la tecnología principal de programación móvil que se aprenderá?",
                "opciones": [
                    "Flutter y Dart",
                    "Swift y Kotlin nativos",
                    "React Native con JavaScript",
                    "Java para Android Studio"
                ],
                "correcta": 2
            },
            {
                "id": "q6",
                "texto": "¿Cuántas unidades tiene la materia de Programación Móvil?",
                "opciones": [
                    "Dos unidades",
                    "Cuatro unidades",
                    "Tres unidades",
                    "Cinco unidades"
                ],
                "correcta": 2
            }
        ]
    },

    "timeline": {
        "id": "timeline",
        "orden": 4,
        "titulo": "La Línea del Tiempo",
        "descripcion": "El mapa del destino. Aquí están las fechas clave que marcarán tu camino este semestre. ¡No las olvides!",
        "contenido": [
            {
                "subtitulo": "Fechas de Exámenes",
                "puntos": [
                    "Examen Parcial 1: 01 de Junio de 2026",
                    "Examen Parcial 2: 06 de Julio de 2026",
                    "Examen Parcial 3: 10 de Agosto de 2026",
                    "Fecha Final / Cierre: 17 de Agosto de 2026",
                ]
            },
            {
                "subtitulo": "Entregas por Parcial",
                "puntos": [
                    "Cada parcial incluye: actividades teóricas, prácticas y entrega de producto.",
                    "Las actividades deben estar en Classroom antes de la fecha del examen.",
                    "Los repositorios de GitHub deben tener commits previos a cada parcial.",
                    "Los video reportes se entregan junto con cada práctica.",
                ]
            },
            {
                "subtitulo": "Consejos para Sobrevivir",
                "puntos": [
                    "No dejes todo para el último día antes del examen.",
                    "Haz commits frecuentes, no uno solo al final.",
                    "Pregunta tus dudas durante el parcial, no al cierre.",
                    "Revisa Classroom regularmente para no perder actividades.",
                ]
            }
        ],
        "preguntas": [
            {
                "id": "q7",
                "texto": "¿En qué fecha es el primer examen parcial?",
                "opciones": [
                    "06 de Julio de 2026",
                    "10 de Agosto de 2026",
                    "17 de Agosto de 2026",
                    "01 de Junio de 2026"
                ],
                "correcta": 3
            },
            {
                "id": "q8",
                "texto": "¿Cuál es la fecha final de cierre del semestre?",
                "opciones": [
                    "10 de Agosto de 2026",
                    "17 de Agosto de 2026",
                    "06 de Julio de 2026",
                    "01 de Junio de 2026"
                ],
                "correcta": 1
            }
        ]
    }
}

ORDEN = ["reglas", "notas", "skills", "timeline"]


@app.route("/")
def index():
    if "desbloqueadas" not in session:
        session["desbloqueadas"] = ["reglas"]
    return render_template("index.html", sections=SECTIONS, orden=ORDEN)


@app.route("/api/estado")
def estado():
    return jsonify({
        "desbloqueadas": session.get("desbloqueadas", ["reglas"])
    })


@app.route("/api/verificar", methods=["POST"])
def verificar():
    data = request.get_json()
    seccion_id = data.get("seccion")
    respuestas = data.get("respuestas", {})

    if seccion_id not in SECTIONS:
        return jsonify({"error": "Sección no válida"}), 400

    seccion = SECTIONS[seccion_id]
    preguntas = seccion["preguntas"]

    resultados = {}
    correctas = 0

    for pregunta in preguntas:
        pid = pregunta["id"]
        respuesta_usuario = respuestas.get(pid)
        es_correcta = respuesta_usuario == pregunta["correcta"]

        resultados[pid] = {
            "correcta": es_correcta,
            "respuesta_correcta": pregunta["correcta"]
        }

        if es_correcta:
            correctas += 1

    aprobado = correctas == len(preguntas)

    return jsonify({
        "aprobado": aprobado,
        "correctas": correctas,
        "total": len(preguntas),
        "resultados": resultados
    })


@app.route("/api/desbloquear", methods=["POST"])
def desbloquear():
    data = request.get_json()
    seccion_id = data.get("seccion")

    if seccion_id not in SECTIONS:
        return jsonify({"error": "Sección no válida"}), 400

    desbloqueadas = session.get("desbloqueadas", ["reglas"])

    idx = ORDEN.index(seccion_id)
    siguiente_idx = idx + 1

    if siguiente_idx < len(ORDEN):
        siguiente = ORDEN[siguiente_idx]

        if siguiente not in desbloqueadas:
            desbloqueadas.append(siguiente)
            session["desbloqueadas"] = desbloqueadas

        return jsonify({
            "desbloqueadas": desbloqueadas,
            "siguiente": siguiente
        })

    else:
        return jsonify({
            "desbloqueadas": desbloqueadas,
            "siguiente": None,
            "completado": True
        })


@app.route("/api/reset", methods=["POST"])
def reset():
    session["desbloqueadas"] = ["reglas"]
    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(debug=True)