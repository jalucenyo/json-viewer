const FUNNY_TEMPLATE_NAMES = [
  "Clon descontrolado",
  "Hijo del Ctrl+V",
  "Pegatina cósmica",
  "Frankencode",
  "Plantilla zombie",
  "JSONcito perezoso",
  "Copia barata",
  "Duplicado sospechoso",
  "Hermano perdido",
  "El retorno del template",
  "Segunda parte",
  "Reencarnación",
  "Gemelo malvado",
  "Fotocopia sospechosa",
  "Clon imperfecto",
  "Template de repuesto",
  "La venganza del JSON",
  "Mutante del portapapeles",
  "Doppelgänger digital",
  "Recorte mágico",
  "Versión B-sides",
  "Remezcla inesperada",
  "Error 404: originalidad",
  "Ctrl+C, Ctrl+alegría",
  "Clonación fallida",
  "Copia de seguridad emocional",
  "El gemelo del medio",
  "Template turista",
  "Huésped del clipboard",
  "Segunda oportunidad",
]

export function getFunnyTemplateName(): string {
  const index = Math.floor(Math.random() * FUNNY_TEMPLATE_NAMES.length)
  return FUNNY_TEMPLATE_NAMES[index]
}
