-- Borrar del Calendario de Apple (macOS) solo los eventos importados desde plan.ics.
-- Matchea por uid terminado en "@plan.claude" - no toca nada más.
--
-- Cómo usar:
-- 1. Abrí "Editor de Scripts" (Spotlight: Cmd+Espacio → "Script Editor" o "Editor de Scripts")
-- 2. Pegá este archivo entero
-- 3. (Opcional, recomendado) Primero corré "contarEventosPlan" para ver qué encontró
--    sin borrar: comenta la última línea y descomenta la anterior.
-- 4. Click en el botón Play (▶) arriba.
-- 5. Te pide permisos para Calendario - aceptá.
-- 6. Mirá la pestaña "Registro" abajo - te dice cuántos borró por calendario.
--
-- ⚠️ Esto solo borra de Calendario de Apple en este Mac. Si tus calendarios están
-- sincronizados con iCloud, los cambios se propagan al iPhone automáticamente.

on borrarEventosPlan()
	tell application "Calendar"
		set totalBorrados to 0
		set listaCals to every calendar
		repeat with cal in listaCals
			set borradosCal to 0
			set nombreCal to name of cal
			tell cal
				try
					set planEvents to (every event whose uid ends with "@plan.claude")
					repeat with e in planEvents
						delete e
						set borradosCal to borradosCal + 1
					end repeat
				on error errMsg
					log "Error en \"" & nombreCal & "\": " & errMsg
				end try
			end tell
			if borradosCal > 0 then
				log "Calendario \"" & nombreCal & "\": " & borradosCal & " eventos borrados"
				set totalBorrados to totalBorrados + borradosCal
			end if
		end repeat
		log "Total borrados: " & totalBorrados
	end tell
end borrarEventosPlan

on contarEventosPlan()
	tell application "Calendar"
		set totalEncontrados to 0
		set listaCals to every calendar
		repeat with cal in listaCals
			set nombreCal to name of cal
			tell cal
				try
					set planEvents to (every event whose uid ends with "@plan.claude")
					set cantidad to count of planEvents
					if cantidad > 0 then
						log "Calendario \"" & nombreCal & "\": " & cantidad & " eventos del plan"
						set totalEncontrados to totalEncontrados + cantidad
					end if
				on error errMsg
					log "Error en \"" & nombreCal & "\": " & errMsg
				end try
			end tell
		end repeat
		log "Total encontrados: " & totalEncontrados
	end tell
end contarEventosPlan

-- Descomenta UNA de las dos líneas según qué querés hacer:
-- contarEventosPlan()   -- solo cuenta, no borra
borrarEventosPlan()   -- borra todos los del plan
