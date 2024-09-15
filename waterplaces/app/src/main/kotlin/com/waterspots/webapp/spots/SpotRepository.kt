package com.waterspots.webapp.spots

import com.waterspots.webapp.spots.models.Spot
import org.springframework.stereotype.Repository

@Repository
class SpotRepository(private var spots: MutableList<Spot> = mutableListOf(
        Spot(id =  "1", title = "Blausee", imageUrl = "/images/lakes/blausee.jpg", description = "Der Blausee ist trotz seiner geringen Grösse von 0,64 ha einer der bekanntesten Bergseen der Schweiz. Er ist ein beliebtes Ausflugsziel im Berner Oberland. Er liegt nahe Mitholz auf dem Gebiet der Gemeinde Kandergrund."),
        Spot(id =  "2", title = "Morainelake", imageUrl = "/images/lakes/morainelake.jpg", description = "Der Moraine Lake ist ein von Gletschern gespeister See im Banff-Nationalpark in Alberta, Kanada. Er liegt im Valley of the Ten Peaks, einem Tal, das von zehn Berggipfeln der Wenkchemna Range umgeben ist, auf einer Höhe von 1.884 m über dem Meeresspiegel."),
        Spot(id =  "3", title = "Öschinesee", imageUrl = "/images/lakes/oeschinensee.jpg", description = "Der Oeschinensee liegt oberhalb von Kandersteg in der Schweiz. Sein Wasserspiegel liegt durchschnittlich auf einer Höhe von 1578 m. Der See ist bei normalem Wasserstand 56 m tief und hat eine Fläche von 1,1 km², womit er zu den grösseren Bergseen in der Schweiz gehört."),
        Spot(id =  "4", title = "Seealpsee", imageUrl = "/images/lakes/seealpsee.jpg", description = "Der Seealpsee ist ein auf 1141 m ü. M. liegender See im Alpsteingebiet in der Schweiz und gehört zum Kanton Appenzell Innerrhoden. Die idyllische Lage, das saubere Wasser sowie zwei Berggasthäuser machen den Seealpsee zu einem der beliebtesten Ausflugsziele im Alpsteingebiet."),
        Spot(id =  "5", title = "Wildsee", imageUrl = "/images/lakes/wildsee.jpg", description = "Der Wildsee ist ein Bergsee im Schweizer Kanton St. Gallen. Er liegt in der Gipfelregion des Pizol auf 2438 m ü. M., etwas nördlich des Gipfels im Vorfeld des Pizolgletschers. Er verfügt über keinen oberirdischen Abfluss. Etwas unterhalb liegt der Schottensee, im Westen der Hochwart."),
        Spot(id =  "6", title = "Almsee", imageUrl = "/images/lakes/almsee.jpg", description = "Der Almsee ist ein See im oberösterreichischen Teil des Salzkammergutes. Er liegt im Almtal 11 km südlich von Grünau im Almtal, am Nordende des Toten Gebirges. Der See, der früher Albensee genannt wurde, ist 2,3 km lang und 700 m breit."),
        Spot(id =  "7", title = "Crestasee", imageUrl = "/images/lakes/crestasee.jpg", description = "Der Crestasee liegt zwischen Flims und Trin im schweizerischen Kanton Graubünden auf 844 m Höhe. Er liegt mit etwas mehr als die Hälfte der Fläche auf dem Gemeindegebiet von Flims, der Rest gehört zu Trin. Der Name leitet sich ab vom lateinischen Wort crista für «Geländekamm»."),
        Spot(id =  "9", title = "Clearwater-Lake", imageUrl = "/images/lakes/clearwater.jpg", description = "Der Clearwater Lake ist ein See im zentralen Osten der kanadischen Provinz British Columbia. Der Clearwater Lake befindet sich in den Cariboo Mountains auf einer Höhe von 680 m. Er liegt im Wells Gray Provincial Park. Der See hat eine Längsausdehnung in Nord-Süd-Richtung von 24 km."),
        Spot(id = "10", title = "Lake-Louise", imageUrl = "/images/lakes/lakelouise.jpg", description = "Lake Louise ist eine Ansiedlung in der kanadischen Provinz Alberta mit 1041 Einwohnern, die in erster Linie als Urlaubsort bekannt ist. Es ist Ausgangspunkt für Skitouren im Winter sowie Wildtierbeobachtungen und Bergwanderungen im Sommer, weshalb es mehrere, zum Teil luxuriöse Hotels gibt."),
        Spot(id = "11", title = "Pitburgersee", imageUrl = "/images/lakes/pitburgersee.jpg", description = "Der Piburger See, in älteren Quellen auch Pipurger See, ist ein Bergsee im Ötztal bei Oetz, der eine Fläche von 14 ha und eine maximale Tiefe von 25 m aufweist. Aufgrund seiner reizvollen landschaftlichen Lage und der relativ hohen Wassertemperaturen im Sommer ist er als Ausflugsziel und Badesee beliebt. Er ist als Naturdenkmal und Teil eines Landschaftsschutzgebietes ein Lebensraum für viele geschützte Tier- und Pflanzenarten."))) {


        fun getAllSpots(): List<Spot> {
        return spots
    }

    fun getSpotByName(vararg title: String): Spot = spots.single {
        title.contains(it.title)
    }
}






