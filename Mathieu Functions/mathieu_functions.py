import numpy as np
npvn = [int(x) for x in np.__version__.split('.')[0:2]]
class mathieu(object):
    class MathieuError(ValueError):
        pass
    def __init__(self, q, M=20, norm=2, cutoff=1.0E-12):
        self.M = M
        self.cutoff = cutoff
        self.norm = 2
        self.A = np.empty((M, M, 2), dtype=complex)
        self.B = np.empty((M, M, 2), dtype=complex)
        q_test = np.asarray(q)
        self.q = q
        coeff = np.zeros((M, M), dtype=complex)
        self.mcn = np.empty((M, 4), dtype=complex)
        ord = np.arange(0, M + 3)
        sgn = np.where(ord % 2 == 0, 1, -1)
        self.ord = ord
        self.sgnord = sgn
        voff = np.ones((M - 1,), dtype=complex) * q
        voffm = np.diag(voff, k=-1) + np.diag(voff, k=+1)
        coeff += np.diag(np.array((2.0 * ord[0:M]) ** 2, dtype=complex), k=0)
        coeff += voffm
        coeff[1, 0] *= 2.0
        self.mcn[:, 0], self.A[:, :, 0] = np.linalg.eig(coeff)
        self.A[:, :, 0] /= np.sum(self.A[:, :, 0] * sgn[0:M, None], axis=0)[None, :]
        coeff = np.zeros((M, M), dtype=complex)
        coeff += np.diag(np.array((2.0 * ord[0:M] + 1.0) ** 2, dtype=complex), k=0)
        coeff += voffm
        coeff[0, 0] += q
        self.mcn[:, 1], self.A[:, :, 1] = np.linalg.eig(coeff)
        self.A[:, :, 1] /= np.sum((2.0 * ord[0:M, None] + 1) * sgn[0:M, None] * self.A[:, :, 1], axis=0)[None, :]
        coeff = np.zeros((M, M), dtype=complex)
        coeff += np.diag(np.array((2.0 * ord[1:M + 1]) ** 2, dtype=complex), k=0)
        coeff += voffm
        self.mcn[:, 2], self.B[:, :, 0] = np.linalg.eig(coeff)
        self.B[:, :, 0] /= np.sum((2.0 * ord[0:M, None] + 2) * sgn[0:M, None] * self.B[:, :, 0], axis=0)[None, :]
        coeff = np.zeros((M, M), dtype=complex)
        coeff += np.diag(np.array((2.0 * ord[0:M] + 1.0) ** 2, dtype=complex), k=0)
        coeff += voffm
        coeff[0, 0] -= q
        self.mcn[:, 3], self.B[:, :, 1] = np.linalg.eig(coeff)
        self.B[:, :, 1] /= np.sum(self.B[:, :, 1] * sgn[0:M, None], axis=0)[None, :]
        d = np.sum(np.abs(np.diagonal(self.A[:, :, 0]))) / self.M
        for n in range(1, self.M):
            if np.sum(np.abs(np.diagonal(self.A[:, :, 0], -n))) / (d * (self.M - n)) < cutoff:
                buff = n
                break
        try:
            buff
        except NameError:
            error = ("infinite matrix size too small for given " +
                     "q=(%.1f,%.1f), cannot meet cutoff (%.1e) with matrix size (%i)" %
                     (q.real, q.imag, cutoff, self.M))
        else:
            self.buffer = buff
        self.A.shape = (M, M, 2, 1)
        self.B.shape = (M, M, 2, 1)

    def _error_check(self, n):
        if np.max(n) + self.buffer > self.M:
            err = ("max Mathieu function order (%i) too high," +
                   "increase 'inf' matrix size M=%i," +
                   "given q=(%.1f,%.1fj) and buffer=%i" %
                   (np.max(n), self.M, self.q.real, self.q.imag, self.buffer))
            # raise self.MathieuError, err

    def _AngFuncSetup(self, n, z):
        self._error_check(n)
        vv = self.ord[0:self.M]
        nn = np.atleast_1d(n)
        return (nn, np.atleast_1d(z), vv, np.where(vv % 2 == 0, 1, -1)[:, None], nn % 2 == 0, nn % 2 == 1)

    def _RadFuncSetup(self, n, z):
        self._error_check(n)
        sqrtq = np.sqrt(self.q)
        nn = np.atleast_1d(n)
        zz = np.atleast_1d(z)
        return (nn, zz, sqrtq, sqrtq * np.exp(-zz), sqrtq * np.exp(zz), self.M, nn % 2 == 0, nn % 2 == 1)

    def _RadDerivFuncSetup(self, n, z):
        self._error_check(n)
        sqrtq = np.sqrt(self.q)
        nn = np.atleast_1d(n)
        zz = np.atleast_1d(z)
        enz = np.exp(-zz)
        epz = np.exp(zz)
        return (nn, zz, sqrtq, enz, epz, sqrtq * enz, sqrtq * epz, self.M, nn % 2 == 0, nn % 2 == 1)

    def _deriv(self, z, W, t):
        assert t == 0 or t == 1
        s = np.array([1.0, -1.0])
        WD = np.empty_like(W)
        n = W.shape[0] - 1
        WD[0, :] = W[1, :] * s[t]
        WD[1:n - 1, :] = 0.5 * (W[0:n - 2, :] + W[2:n, :]) * s[t]
        WD[n, :] = W[n - 1, :] * s[t] - n / z[None, :] * W[n, :]
        return WD

    def ce(self, n, z):
        n, z, v, vi, EV, OD = self._AngFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        j = n[:] // 2
        y[EV, :] = np.sum(self.A[:, j[EV], 0, :] * np.cos(np.outer(2 * v, np.pi / 2 - z))[:, None, :], axis=0)
        y[OD, :] = np.sum(self.B[:, j[OD], 1, :] * np.sin(np.outer(2 * v + 1, np.pi / 2 - z))[:, None, :], axis=0)
        return np.squeeze(y)

    def se(self, n, z):
        n, z, v, vi, EV, OD = self._AngFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        j = (n[:] - 1) // 2
        y[EV, :] = np.sum(self.B[:, j[EV], 0, :] * np.sin(np.outer(2 * v + 2, np.pi / 2 - z))[:, None, :], axis=0)
        y[OD, :] = np.sum(self.A[:, j[OD], 1, :] * np.cos(np.outer(2 * v + 1, np.pi / 2 - z))[:, None, :], axis=0)
        y[n == 0, :] = np.NaN
        return np.squeeze(y)

    def dce(self, n, z):
        n, z, v, vi, EV, OD = self._AngFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        j = n[:] // 2
        jsgn = np.where(j % 2 == 0, 1, -1)[:, None]
        y[EV, :] = np.sum(2 * v[:, None, None] * self.A[:, j[EV], 0, :] * np.sin(np.outer(2 * v, np.pi / 2 - z))[:, None, :], axis=0)
        y[OD, :] = -np.sum((2 * v[:, None, None] + 1) * self.B[:, j[OD], 1, :] * np.cos(np.outer(2 * v + 1, np.pi / 2 - z))[:, None, :], axis=0)
        return np.squeeze(y)

    def dse(self, n, z):
        n, z, v, vi, EV, OD = self._AngFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        j = (n[:] - 1) // 2  # se_0() invalid
        y[EV, :] = -np.sum((2 * v[:, None, None] + 2) * self.B[:, j[EV], 0, :] * np.cos(np.outer(2 * v + 2, np.pi / 2 - z))[:, None, :], axis=0)
        y[OD, :] = np.sum((2 * v[:, None, None] + 1) * self.A[:, j[OD], 1, :] * np.sin(np.outer(2 * v + 1, np.pi / 2 - z))[:, None, :], axis=0)
        y[n == 0, :] = np.NaN
        return np.squeeze(y)

    def Ce(self, n, z):
        from scipy.special import ive
        n, z, sqrtq, v1, v2, M, EV, OD = self._RadFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 1]
        sgn = self.sgnord[0:M, None, None]
        I1 = ive(ord[0:M + 1, None], v1[None, :])[:, None, :]
        I2 = ive(ord[0:M + 1, None], v2[None, :])[:, None, :]
        j = n[:] // 2
        y[EV, :] = (np.sum(sgn * self.A[0:M, j[EV], 0, :] * I1[0:M, :, :] * I2[0:M, :, :], axis=0) / self.A[0, j[EV], 0, :])
        y[OD, :] = (np.sum(sgn * self.B[0:M, j[OD], 1, :] * (I1[0:M, :, :] * I2[1:M + 1, :, :] + I1[1:M + 1, :, :] * I2[0:M, :, :]), axis=0) / self.B[0, j[OD], 1, :])
        y *= np.exp(np.abs(v1.real) + np.abs(v2.real))[None, :]
        return np.squeeze(y)

    def Se(self, n, z):
        from scipy.special import ive
        n, z, sqrtq, v1, v2, M, EV, OD = self._RadFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 2]
        sgn = self.sgnord[0:M, None, None]
        I1 = ive(ord[0:M + 2, None], v1[None, :])[:, None, :]
        I2 = ive(ord[0:M + 2, None], v2[None, :])[:, None, :]
        j = (n[:] - 1) // 2
        y[EV, :] = (np.sum(sgn * self.B[0:M, j[EV], 0, :] * (I1[0:M, :, :] * I2[2:M + 2, :, :] - I1[2:M + 2, :, :] * I2[0:M, :, :]), axis=0) / self.B[0, j[EV], 0, :])
        y[OD, :] = (np.sum(sgn * self.A[0:M, j[OD], 1, :] * (I1[0:M, :, :] * I2[1:M + 1, :, :] - I1[1:M + 1, :, :] * I2[0:M, :, :]), axis=0) / self.A[0, j[OD], 1, :])
        y *= np.exp(np.abs(v1.real) + np.abs(v2.real))[None, :]
        y[n == 0, :] = np.NaN
        return np.squeeze(y)

    def Fek(self, n, z):
        from scipy.special import kve, ive
        n, z, sqrtq, v1, v2, M, EV, OD = self._RadFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 1]
        I = ive(ord[0:M + 1, None], v1[None, :])[:, None, :]
        K = kve(ord[0:M + 1, None], v2[None, :])[:, None, :]
        j = n[:] // 2
        y[EV, :] = np.sum(self.A[0:M, j[EV], 0, :] * I[0:M, :, :] * K[0:M, :, :], axis=0) / self.A[0, j[EV], 0, :]
        y[OD, :] = (np.sum(self.B[0:M, j[OD], 1, :] * (I[0:M, :, :] * K[1:M + 1, :, :] - I[1:M + 1, :, :] * K[0:M, :, :]), axis=0) / self.B[0, j[OD], 1, :])
        y *= np.exp(np.abs(v1.real) - v2)[None, :]
        return np.squeeze(y)

    def Gek(self, n, z):
        from scipy.special import kve, ive
        n, z, sqrtq, v1, v2, M, EV, OD = self._RadFuncSetup(n, z)
        y = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 2]
        I = ive(ord[0:M + 2, None], v1[None, :])[:, None, :]
        K = kve(ord[0:M + 2, None], v2[None, :])[:, None, :]
        j = (n[:] - 1) // 2
        y[EV, :] = (np.sum(self.B[0:M, j[EV], 0, :] * (I[0:M, :, :] * K[2:M + 2, :, :] - I[2:M + 2, :, :] * K[0:M, :, :]), axis=0) / self.B[0, j[EV], 0, :])
        y[OD, :] = (np.sum(self.A[0:M, j[OD], 1, :] * (I[0:M, :, :] * K[1:M + 1, :, :] + I[1:M + 1, :, :] * K[0:M, :, :]), axis=0) / self.A[0, j[OD], 1, :])
        y *= np.exp(np.abs(v1.real) - v2)[None, :]
        y[n == 0, :] = np.NaN  # Ko_0() invalid
        return np.squeeze(y)

    def dCe(self, n, z):
        from scipy.special import ive
        n, z, sqrtq, enz, epz, v1, v2, M, EV, OD = self._RadDerivFuncSetup(n, z)
        dy = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 1]
        sgn = self.sgnord[0:M, None, None]
        I1 = ive(ord[0:M + 1, None], v1[None, :])[:, None, :]
        I2 = ive(ord[0:M + 1, None], v2[None, :])[:, None, :]
        dI1 = self._deriv(v1, I1[:, 0, :], 0)[:, None, :]
        dI2 = self._deriv(v2, I2[:, 0, :], 0)[:, None, :]
        j = n[:] // 2
        dy[EV, :] = (sqrtq / self.A[0, j[EV], 0, :] * np.sum(sgn * self.A[0:M, j[EV], 0, :]
                    * (epz * I1[0:M, :, :] * dI2[0:M, :, :] - enz * dI1[0:M, :, :] * I2[0:M, :, :]), axis=0))
        dy[OD, :] = (sqrtq / self.B[0, j[OD], 1, :] * np.sum(sgn * self.B[0:M, j[OD], 1, :]
                    * (epz * I1[0:M, :, :] * dI2[1:M + 1, :, :] - enz * dI1[0:M, :, :] * I2[1:M + 1, :, :]
                    + epz * I1[1:M + 1, :, :] * dI2[0:M, :, :] - enz * dI1[1:M + 1, :, :] * I2[0:M,:,:]), axis=0))
        dy *= np.exp(np.abs(v1.real) + np.abs(v2.real))[None, :]
        return np.squeeze(dy)

    def dSe(self, n, z):
        from scipy.special import ive
        n, z, sqrtq, enz, epz, v1, v2, M, EV, OD = self._RadDerivFuncSetup(n, z)
        dy = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 2]
        sgn = self.sgnord[0:M, None, None]
        I1 = ive(ord[0:M + 2, None], v1[None, :])[:, None, :]
        I2 = ive(ord[0:M + 2, None], v2[None, :])[:, None, :]
        dI1 = self._deriv(v1, I1[0:M + 2, 0, :], 0)[:, None, :]
        dI2 = self._deriv(v2, I2[0:M + 2, 0, :], 0)[:, None, :]
        j = (n[:] - 1) // 2
        dy[EV, :] = (sqrtq / self.B[0, j[EV], 0, :] * np.sum(sgn * self.B[0:M, j[EV], 0, :] * (epz * I1[0:M, :, :]
                    * dI2[2:M + 2, :, :] - enz * dI1[0:M, :, :] * I2[2:M + 2, :, :] - (epz * I1[2:M + 2, :, :]
                    * dI2[0:M, :, :] - enz * dI1[2:M + 2, :, :] * I2[0:M, :,:])), axis=0))
        dy[OD, :] = (sqrtq / self.A[0, j[OD], 1, :] * np.sum(sgn * self.A[0:M, j[OD], 1, :] * (epz * I1[0:M, :, :]
                    * dI2[1:M + 1, :, :] - enz * dI1[0:M, :, :] * I2[1:M + 1, :, :] - (epz * I1[1:M + 1, :, :]
                    * dI2[0:M, :, :] - enz * dI1[1:M + 1, :, :] * I2[0:M, :, :])), axis=0))
        dy *= np.exp(np.abs(v1.real) + np.abs(v2.real))[None, :]
        dy[n == 0, :] = np.NaN
        return np.squeeze(dy)

    def dFek(self, n, z):
        from scipy.special import kve, ive
        n, z, sqrtq, enz, epz, v1, v2, M, EV, OD = self._RadDerivFuncSetup(n, z)
        dy = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 1]
        I = ive(ord[0:M + 1, None], v1[None, :])[:, None, :]
        K = kve(ord[0:M + 1, None], v2[None, :])[:, None, :]
        dI = self._deriv(v1, I[0:M + 1, 0, :], 0)[:, None, :]
        dK = self._deriv(v2, K[0:M + 1, 0, :], 1)[:, None, :]
        j = n[:] // 2
        dy[EV, :] = (sqrtq / self.A[0, j[EV], 0, :] * np.sum(self.A[0:M, j[EV], 0, :] * (epz * I[0:M, :, :]
                    * dK[0:M, :, :] - enz * dI[0:M, :, :] * K[0:M, :, :]), axis=0))
        dy[OD, :] = (sqrtq / self.B[0, j[OD], 1, :] * np.sum(self.B[0:M, j[OD], 1, :] * (epz * I[0:M, :, :]
                    * dK[1:M + 1, :, :] - enz * dI[0:M, :, :] * K[1:M + 1, :, :] - (epz * I[1:M + 1, :, :]
                    * dK[0:M, :, :] - enz * dI[1:M + 1, :, :] * K[0:M,:,:])),axis=0))
        dy *= np.exp(np.abs(v1.real) - v2)[None, :]
        return np.squeeze(dy)

    def dGek(self, n, z):
        from scipy.special import kve, ive
        n, z, sqrtq, enz, epz, v1, v2, M, EV, OD = self._RadDerivFuncSetup(n, z)
        dy = np.empty((n.shape[0], z.shape[0]), dtype=complex)
        ord = self.ord[0:M + 2]
        I = ive(ord[0:M + 2, None], v1[None, :])[:, None, :]
        K = kve(ord[0:M + 2, None], v2[None, :])[:, None, :]
        dI = self._deriv(v1, I[0:M + 2, 0, :], 0)[:, None, :]
        dK = self._deriv(v2, K[0:M + 2, 0, :], 1)[:, None, :]
        j = (n[:] - 1) // 2
        dy[EV, :] = (sqrtq / self.B[0, j[EV], 0, :] * np.sum(self.B[0:M, j[EV], 0, :] * (epz * I[0:M, :, :]
                    * dK[2:M + 2, :, :] - enz * dI[0:M, :, :] * K[2:M + 2, :, :] - (epz * I[2:M + 2, :, :]
                    * dK[0:M, :, :] - enz * dI[2:M + 2, :, :] * K[0:M, :, :])), axis=0))
        dy[OD, :] = (sqrtq / self.A[0, j[OD], 1, :] * np.sum(self.A[0:M, j[OD], 1, :] * (epz * I[0:M, :, :]
                    * dK[1:M + 1, :, :] - enz * dI[0:M, :, :] * K[1:M + 1, :, :] + epz * I[1:M + 1, :, :]
                    * dK[0:M, :, :] - enz * dI[1:M + 1, :, :] * K[0:M, :, :]), axis=0))
        dy *= np.exp(np.abs(v1.real) - v2)[None, :]
        dy[n == 0, :] = np.NaN  # dKo_0() invalid
        return np.squeeze(dy)

