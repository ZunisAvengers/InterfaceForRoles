using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public enum State
    {
        Create,
        InProgressing,
        WaitingForInstallation,
        Installating,
        InstallatingСompleted,
        Completed
    }
}
