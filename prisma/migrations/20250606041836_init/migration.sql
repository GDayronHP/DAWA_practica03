-- CreateTable
CREATE TABLE `Laboratorio` (
    `CodLab` INTEGER NOT NULL AUTO_INCREMENT,
    `razonSocial` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodLab`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `nroCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaEmision` DATETIME(3) NOT NULL,
    `Situacion` VARCHAR(191) NOT NULL,
    `Total` DOUBLE NOT NULL,
    `NroFacturaProv` INTEGER NOT NULL,
    `CodLab` INTEGER NOT NULL,

    PRIMARY KEY (`nroCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_CodLab_fkey` FOREIGN KEY (`CodLab`) REFERENCES `Laboratorio`(`CodLab`) ON DELETE RESTRICT ON UPDATE CASCADE;
