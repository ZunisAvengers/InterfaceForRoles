using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public enum State
    {
        InProgressing,          //-в обработке
        WaitingForInstallation, //-ожидание установки
        Installating,           //-установка
        InstallatingСompleted,  //-установка выполнена
        Completed,              //-выполнена (и проверено)
        Canceled                //- отменено
    }
}
