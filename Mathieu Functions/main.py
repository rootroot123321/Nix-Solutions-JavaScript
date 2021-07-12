import numpy as np
import matplotlib.pyplot as plt
import mathieu_functions as mf
m = mf.mathieu(2.0 + 5.0j)
ord = np.arange(8)
xi = np.linspace(0,np.pi/2,200)
ce = m.ce(ord, xi)
se = m.se(ord, xi)
dce = m.dce(ord, xi)
dse = m.dse(ord, xi)
Ce = m.Ce(ord, xi)
Se = m.Se(ord, xi)
dCe = m.dCe(ord, xi)
dSe = m.dSe(ord, xi)
Fek = m.Fek(ord, xi)
Gek = m.Gek(ord, xi)
dFek = m.dFek(ord, xi)
dGek = m.dGek(ord,xi)
for n in ord:
    plt.plot(ce[n,:].real,'-')
    plt.plot(ce[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('ce$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(se[n,:].real,'-')
    plt.plot(se[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('se$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dce[n,:].real,'-')
    plt.plot(dce[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('ce$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dse[n,:].real,'-')
    plt.plot(dse[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('se$_{n}\'(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(Ce[n,:].real,'-')
    plt.plot(Ce[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Ce$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(Se[n,:].real,'-')
    plt.plot(Se[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Se$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dCe[n,:].real,'-')
    plt.plot(dCe[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Ce$_{n}\'(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dSe[n,:].real,'-')
    plt.plot(dSe[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Se$_{n}\'(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(Fek[n,:].real,'-')
    plt.plot(Fek[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Fek$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(Gek[n,:].real,'-')
    plt.plot(Gek[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Gek$_{n}(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dFek[n,:].real,'-')
    plt.plot(dFek[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Fek$_{n}\'(\\xi,q=2+5i)$')
plt.show()
for n in ord:
    plt.plot(dGek[n,:].real,'-')
    plt.plot(dGek[n,:].imag,':')
    plt.xlabel('$\\xi$')
    plt.ylabel('Gek$_{n}\'(\\xi,q=2+5i)$')
plt.show()


