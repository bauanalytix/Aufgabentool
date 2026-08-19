# Mein Tag App

Diese Fassung ist eine installierbare Web-App (PWA) für Handy und Laptop. Die bisherigen HTML-Dateien wurden nicht verändert.

Online-Adresse: https://mein-tag-daniela.web.app

Im GitHub-Repository liegen die veröffentlichten App-Dateien direkt im Hauptordner. Dadurch ist `index.html` zugleich der aktuelle Quellstand und die GitHub-Pages-Startdatei. Firebase Hosting verwendet beim Veröffentlichen ebenfalls diesen Hauptordner; Verwaltungsdateien werden über `firebase.json` ausgeschlossen.

## Warum Handy und Laptop sich nicht mehr überschreiben

Die alte Fassung schrieb den gesamten Inhalt in ein einziges Firebase-Dokument. Diese Fassung speichert jede Änderung als unveränderlichen Eintrag unter:

`meinTagV2/<Google-Nutzer-ID>/events`

Damit bleiben Änderungen beider Geräte erhalten. Aufgaben, Notizen, Archive und Einstellungen werden getrennt rekonstruiert. Bearbeiten zwei Geräte ausnahmsweise denselben Eintrag gleichzeitig, bleibt bei Aufgaben eine sichtbare Konfliktkopie erhalten; bei Notizen werden beide Textfassungen zusammengeführt.

## Fluse-Gedanken

Ein Klick oder Fingertipp auf das Fluse-Bild öffnet eine ruhige, separate Schreibseite. Der frei eingegebene Text wird automatisch als besondere Notiz gespeichert und zwischen Handy und Laptop synchronisiert. Die Seite ist bewusst nur über Fluse erreichbar und nicht durch eine PIN geschützt.

## Firebase-Einrichtung (am 17.08.2026 ausgeführt)

1. Die Google-Anmeldung ist im Firebase-Projekt `rueckrufliste-1caf7` aktiviert.
2. Die vorbereiteten Firestore-Regeln sind veröffentlicht. Sie lassen die vorhandenen Sammlungen `Rückrufe` und `aufgabentool` unverändert weiterlaufen und schützen `meinTagV2` durch die Google-Nutzer-ID.
3. Die eigene Hosting-Site `mein-tag-daniela` verhindert, dass eine andere Anwendung im Projekt überschrieben wird.
4. Die App ist über Firebase Hosting bereitgestellt. Die App-Domain und der OAuth-Rücksprung sind bei Firebase und Google autorisiert.

## Sichere erste Datenübernahme

- Zuerst mit demselben Google-Konto anmelden, das auf Handy und Laptop verwendet wird.
- Ist der neue Firebase-Bereich leer, entweder „Bisherige Firebase-Daten übernehmen“ oder „Diesen Gerätestand übernehmen“ wählen.
- Die App verweigert die Initialübernahme, sobald im neuen Bereich bereits Daten vorhanden sind.
- Auf dem zweiten Gerät „Firebase-Daten verwenden“ wählen. Vorher speichert die App dort automatisch eine lokale Rückfallsicherung.

## Installation

Die Adresse `https://mein-tag-daniela.web.app` öffnen und anschließend:

- Windows-Laptop (Edge oder Chrome): Im Browsermenü „Apps“ beziehungsweise „Mein Tag installieren“ auswählen.
- Android: Im Browsermenü „App installieren“ oder „Zum Startbildschirm hinzufügen“ auswählen.
- iPhone/iPad (Safari): Teilen-Symbol öffnen und „Zum Home-Bildschirm“ auswählen.

Auf allen Geräten mit demselben Google-Konto anmelden. Beide Installationen verwenden dann dieselbe Codebasis und denselben konfliktgeschützten Firebase-Datenbestand.
