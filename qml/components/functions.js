/****************************************************************************
**
** Copyright (C) 2014 Digia Plc and/or its subsidiary(-ies).
** Contact: http://www.qt-project.org/legal
**
** This file is part of the examples of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:BSD$
** You may use this file under the terms of the BSD license as follows:
**
** "Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are
** met:
**   * Redistributions of source code must retain the above copyright
**     notice, this list of conditions and the following disclaimer.
**   * Redistributions in binary form must reproduce the above copyright
**     notice, this list of conditions and the following disclaimer in
**     the documentation and/or other materials provided with the
**     distribution.
**   * Neither the name of Digia Plc and its Subsidiary(-ies) nor the names
**     of its contributors may be used to endorse or promote products derived
**     from this software without specific prior written permission.
**
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
** "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
** LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
** A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
** OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
** LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
** THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
** OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."
**
** $QT_END_LICENSE$
**
****************************************************************************/

.import TalkSchedule 1.0 as TS

function countTrackWidth(start, end) {
    var startHours = getHour(start);
    var startMinutes = getMinutes(start);

    var endHours = getHour(end);
    var endMinutes = getMinutes(end);

    var duration = (endHours - startHours)*60 + endMinutes- startMinutes;
    var trackWidth = (TS.Theme.sizes.timeColumnWidth/60) * duration;
    return trackWidth;
}

function countTrackPosition(start) {
    for (var i = 0; i < timeColumnList.count; i++) {
        var modelTime = timeColumn.timeList[i]
        var modelHour = getHour(modelTime);
        var modelminutes = getMinutes(modelTime);

        var startHour = getHour(start);
        if (modelHour === startHour) {
            var tmp = parseInt(TS.Theme.sizes.timeColumnWidth*i);
            // Add minutes too
            var startMinute = getMinutes(start);
            tmp += startMinute*TS.Theme.sizes.timeColumnWidth/60;
            return tmp;
        }
    }
    return 0;
}

function getHour(time, isEndTime) {
    if (isEndTime === undefined)
        isEndTime = false
    var tempTime = Qt.formatTime(time, "h:mm");
    var tempTimeParts = tempTime.split(':');
    var hourPart = parseInt(tempTimeParts[0]);
    if (isEndTime)
        var minutes = getMinutes(time)
    if (minutes > 0)
        hourPart = hourPart + 1
    return hourPart;
}
function getMinutes(time) {
    var tempTime = Qt.formatTime(time, "h:mm");
    var tempTimeParts = tempTime.split(':');
    var minutePart = parseInt(tempTimeParts[1]);
    return minutePart;
}

function isEvenNumber(Nb)
{
   return Nb/2 === Math.round(Nb/2)
}

function isStartTimeAfterNow(start)
{
    var now = new Date()
    var localOffset = now.getTimezoneOffset()
    now = new Date(Date.now() - localOffset * 60 * 1000)
    var eventStart = new Date(start)
    return eventStart > now
}

function isSameDay(model, index)
{
    if (index > 0) {
        var formatDate = "dddd d.M.yyyy"
        var date = Qt.formatDate(model.get(index, "start"), formatDate)
        var date2 = Qt.formatDate(model.get(index - 1, "start"), formatDate)
        return date2 === date
    }
    return false
}
