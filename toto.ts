
// Factory Method Design Pattern Example in TypeScript
interface ImageUploader {
    uploadImage(): string;
}

class PngUploader implements ImageUploader {
    uploadImage(): string {
        return "Uploading PNG image...";
    }
}

class JpegUploader implements ImageUploader {
    uploadImage(): string {
        return "Uploading JPEG image...";
    }
}

class WebpUploader implements ImageUploader {
    uploadImage(): string {
        return "Uploading WebP image...";
    }
}

enum ImageFormat {
    PNG = 'png',
    JPEG = 'jpeg',
    WEB  = 'webp'
}

class ImageUploaderFactory {
    static createUploader(format: ImageFormat): ImageUploader {
        switch (format) {
            case ImageFormat.PNG:
                return new PngUploader();
            case ImageFormat.JPEG:
                return new JpegUploader();
            case ImageFormat.WEB:
                return new WebpUploader();
            default:
                throw new Error(`Unsupported image format: ${format}`);
        }
    }
}

const uploader = ImageUploaderFactory.createUploader(ImageFormat.PNG);
console.log(uploader.uploadImage());

// Command
interface Command {
    execute(): void;
}

class UpdateProfileCommand implements Command {
    execute(): void {
        console.log("Updating user profile...");
    }
}

class ChangePasswordCommand implements Command {
    execute(): void {
        console.log("Changing user password...");
    }
}

class CreateProfileCommand implements Command {
    execute(): void {
        console.log("Creating user profile...");
    }
}

class CommandFactory {
    static createCommand(commandType: string): Command {
        switch (commandType) {
            case 'updateProfile':
                return new UpdateProfileCommand();
            case 'changePassword':
                return new ChangePasswordCommand();
            case 'createProfile':
                return new CreateProfileCommand();
            default:
                throw new Error(`Unsupported command type: ${commandType}`);
        }
    }
}

const command = CommandFactory.createCommand('updateProfile');
command.execute();
